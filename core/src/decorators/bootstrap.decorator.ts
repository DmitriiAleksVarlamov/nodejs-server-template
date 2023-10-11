import {ClassType, Container} from "../utils/container";
import {Injectable} from "./injectable.decorator";

export function Bootstrap(targets: ClassType[]) {
    return (target: ClassType) => {
        Injectable(target)

        // inject Controllers to Bootstrap class
        targets.forEach((importClass) => {
            Object.defineProperty(target, importClass.name, {
                get() {
                    const container = Container.getInstance()

                    return container.instantiate(importClass)
                }
            })
        })

        // instantiate Bootstrap class
        const container = Container.getInstance()
        container.instantiate(target)
    }
}
