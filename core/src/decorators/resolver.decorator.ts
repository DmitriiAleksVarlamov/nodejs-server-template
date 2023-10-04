import "reflect-metadata";
import { Container } from "../utils/container";
export function Resolver(target: any, propertyKey: string) {
    const original = Reflect.getMetadata('design:type', target, propertyKey)

    Object.defineProperty(target, propertyKey, {
        get() {
            const container = Container.getInstance()

            return container.instantiate(original)
        }
    })
}
