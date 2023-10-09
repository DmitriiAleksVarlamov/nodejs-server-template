import { Controller, Endpoint } from "@common/core/decorators";
import {Methods} from "@common/core/types";

@Controller('/api/v1')
export class UserController {
    @Endpoint(Methods.GET, '/users')
    getUsers() {
        return 'getUsers'
    }

    @Endpoint(Methods.GET,'/user/:id/:value')
    getUserById() {
        return 'getUserById!'
    }
}
