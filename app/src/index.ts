import { HttpService } from "@common/core/services/http.service";
import { Resolver } from "@common/core/decorators";
import { UserController } from "./controllers/user.controller";

class Bootstrap {
    @Resolver
    private static server: HttpService

    // @Resolver
    // private static userController: UserController
    static init() {
        const a = new UserController()
        this.server.listen()
    }
}

Bootstrap.init()
