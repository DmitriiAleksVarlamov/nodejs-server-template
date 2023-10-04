import { v4 } from 'uuid'

export type ClassType = new(...args: any[]) => any

const CONTAINER_ID = Symbol('CONTAINER_ID')
export class Container {
    private containers = {}
    private static uniqueInstance: Container
    private instances = {}

    private constructor() {}

    static getInstance(): Container {
        if (this.uniqueInstance) {
            return this.uniqueInstance
        }

        this.uniqueInstance = new Container()
        return this.uniqueInstance
    }

    registrar(target: ClassType) {
        if (!target[CONTAINER_ID]) {
            target[CONTAINER_ID] = v4()

            this.containers[target[CONTAINER_ID]] = {
                Target: target
            }
        }
    }

    instantiate<T>(target: any): T {
        const instanceKey = target[CONTAINER_ID]

        if (!this.instances[instanceKey]) {
            const { Target } = this.containers[target[CONTAINER_ID]]

           const instance = new Target()

            if (instance.init) {
                instance.init()
            }

            this.instances[instanceKey] = instance
        }

        return this.instances[instanceKey] as any
    }

    getContainers() {
        return this.containers
    }
}
