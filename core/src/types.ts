import {ClassType} from "./utils/container";
import * as http from "http";

export const Methods = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
} as const

export type RouteDefinition = {
    // Path to our route
    path: string;
    // HTTP Request method (get, post, ...)
    requestMethod: keyof typeof Methods;
    // Method name within our class responsible for this route
    methodName: string;
}

export type Pattern = RouteDefinition & {
    Controller: ClassType,
    pathname: string | RegExp;
    regExp?: RegExp;
    paramKeys: string[];
}

export type Context = {
    method: http.IncomingMessage["method"];
    body: Record<string, unknown>;
}
