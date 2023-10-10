import { HttpService } from "@common/core/services/http.service";
import { Resolver, Bootstrap, Imports } from "@common/core/decorators";
import { UserController } from "./controllers/user.controller";

@Imports([UserController])

@Bootstrap
export class Bootstrapper {
    @Resolver
    private readonly server: HttpService

    init() {
        this.server.listen()
    }
}
