import { Injectable } from "../decorators";
import {Pattern, RouteDefinition} from "../types";

@Injectable
export class RouterService {
    private static controllers = []
    private patterns: Pattern[] = []

    static register(target: any) {
        if (this.controllers.indexOf(target) === -1) {
            this.controllers.push(target)
        }
    }
    run(pattern: string) {

    }
    init() {
        console.log('RouterService')

        this.prepareRoutes()
    }

    private prepareRoutes() {
        RouterService.controllers.forEach((Controller) => {
            const prefix: string = Reflect.getMetadata('prefix', Controller);
            const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', Controller);

            const endpoints = routes.map((route) => {
                const routePath = route.path.startsWith('/') ? route.path : ('/' + route.path)
                const routePrefix = prefix.endsWith('/') ? prefix.slice(0, prefix.length - 1) : prefix
                const path = routePrefix + routePath

                const params: Pattern = {
                    ...route,
                    path,
                    Controller,
                }

                if (path.match(/(.*)\/:(.+)/)) {
                    // params.keyParams = [];
                    const r = path.replace(/(.*)\/:(.+)\/?/ig, (_: string, attr: string, key: string) => {
                        console.log({_, attr, key})

                        // params.keyParams.push({ attr, key });
                        return '(' + key + ')';
                    });
                    params.regExp = new RegExp(r);
                }
            })
            this.patterns.push(...endpoints)
        })

        this.patterns.sort((a: Pattern) => a.regExp ? 1 : -1);
    }
}
