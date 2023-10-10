import {ClassType, Container} from "../utils/container";
import {Injectable} from "./injectable.decorator";

export function Bootstrap(target: ClassType) {
    Injectable(target)

    const container = Container.getInstance()

    container.instantiate(target)
}
