import {ClassType, Container} from "../utils/container";

export function Injectable(target: ClassType) {
    const container = Container.getInstance()
    container.registrar(target)
}
