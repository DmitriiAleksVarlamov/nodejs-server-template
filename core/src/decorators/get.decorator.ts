import "reflect-metadata";
import { RouteDefinition } from "../types";
import {RouterService} from "../services/router.service";
export function Get(pattern: string) {
    return (target: any, propertyName: string) => {
        // Register Controller class in RouterService controller list
        RouterService.register(target.constructor)

        // Add routes to Controller metadata
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

        routes.push({
            requestMethod: 'get',
            path :pattern,
            methodName: propertyName
        });

        Reflect.defineMetadata('routes', routes, target.constructor);
    }
}
