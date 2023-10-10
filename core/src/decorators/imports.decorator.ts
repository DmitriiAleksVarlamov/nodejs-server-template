import {ClassType, Container} from "../utils/container";

export function Imports(...targets: any[]) {
    return (target: ClassType) => {
        targets.forEach((importClass) => {
            Object.defineProperty(target, importClass.name, {
                get() {
                    const container = Container.getInstance()

                    return container.instantiate(importClass)
                }
            })
        })
    }
}
