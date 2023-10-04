import { ClassType } from "../utils/container";
import "reflect-metadata";
import { Injectable } from "./injectable.decorator";
export function Controller(prefix: string) {
    return (target: ClassType) => {
        Injectable(target)

        Reflect.defineMetadata('prefix', prefix, target);

        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
    }
}
