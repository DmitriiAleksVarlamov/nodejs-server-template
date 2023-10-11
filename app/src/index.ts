import { HttpService } from "@common/core/services/http.service";
import { Resolver, Bootstrap } from "@common/core/decorators";
import { UserController } from "./controllers/user.controller";

@Bootstrap([UserController])
export class Bootstrapper {
    @Resolver
    private readonly server: HttpService

    init() {
        this.server.listen()
    }
}
