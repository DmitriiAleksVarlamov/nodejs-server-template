import {Injectable} from "../decorators";
import {Context, Pattern, RouteDefinition} from "../types";
import {Container} from "../utils/container";

@Injectable
export class RouterService {
    private static controllers = []
    private patterns: Pattern[] = []

    static register(target: any) {
        if (this.controllers.indexOf(target) === -1) {
            this.controllers.push(target)
        }
    }
    async run(pathname: string, ctx: Context) {
        const result = { status: 200, body: null}

        console.log(ctx)
        try {
            const response = await this.execute(pathname, ctx)

            if (response instanceof Response) {
                result.status = response.status
                result.body = response.body
            } else {
                result.body = response
            }
        } catch(error) {
            result.status = 500
            result.body = error.message
        }

        return result
    }
    init() {
        this.prepareRoutes()
    }

    private prepareRoutes() {
        this.patterns = []

        RouterService.controllers.forEach((Controller) => {
            const prefix: string = Reflect.getMetadata('prefix', Controller);
            const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', Controller);

            const endpoints = routes.map((route) => {
                const routePath = route.path.startsWith('/') ? route.path : ('/' + route.path)
                const routePrefix = prefix.endsWith('/') ? prefix.slice(0, prefix.length - 1) : prefix
                const path = routePrefix + routePath

                const params: Pattern = {
                    ...route,
                    pathname: path,
                    Controller,
                    paramKeys: [],
                }

                if (path.match(/(.*)\/(:.+)/)) {
                    const r = path.replace(/:(\w+)(\/?)/gi, (_: string, key: string, slash: string) => {
                        params.paramKeys.push(key);

                        return '(' + '.*' + ')' + slash
                    });
                    params.pathname = new RegExp(r, 'i');
                }

                return params
            })
            this.patterns.push(...endpoints)
        })

        this.patterns.sort((a: Pattern) => a.regExp ? 1 : -1);
    }

    private async execute<T>(pathname: string, ctx: {}) {
        const route = this.matchRoute(pathname, this.patterns)

        if (route) {
            const params = this.formatRouteParams(route.pathname, pathname, route.paramKeys)

            const container = Container.getInstance()

            return await container.instantiate(route.Controller)[route.methodName]({ ...ctx, params })
        }
    }

    private formatRouteParams(regexp: RegExp | string, pathname: string, paramKeys: string[]) {
        const params = {}

        if (typeof regexp === 'string') {
            return params
        }

        const paramsAmount = paramKeys.length + 1;
        const matchedParams = pathname.match(regexp)

        if (matchedParams) {
            const paramValues = matchedParams.slice(1, paramsAmount)

            paramKeys.forEach((key, index) => {
                params[key] = paramValues[index]
            })
        }

        return params
    }

    private matchRoute(pathname: string, patterns: Pattern[]): Pattern | undefined {
        return patterns.find((pattern) => {
            if (pattern.pathname instanceof RegExp) {
                return pattern.pathname.test(pathname)
            }

            return pathname === pattern.pathname
        })
    }
}
