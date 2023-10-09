import "reflect-metadata";
import {Methods, RouteDefinition} from "../types";
import {RouterService} from "../services/router.service";
export function Endpoint(method: RouteDefinition['requestMethod'], pattern: string) {
    return (target: any, propertyName: string) => {
        // Register Controller class in RouterService controller list
        RouterService.register(target.constructor)

        // Add routes to Controller metadata
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

        routes.push({
            requestMethod: method,
            path :pattern,
            methodName: propertyName
        });

        Reflect.defineMetadata('routes', routes, target.constructor);
    }
}
