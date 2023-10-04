import { Injectable } from "../decorators";
import {RouteDefinition} from "../types";

@Injectable
export class RouterService {
    private static controllers = []
    private patterns: RouteDefinition[] = []

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


            console.log({prefix, routes} )
        })
    }
}
