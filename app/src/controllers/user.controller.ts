import {Controller, Get} from "@common/core/decorators";

@Controller('/api/v1')
export class UserController {
    @Get('/users')
    getUsers() {
        return 'getUsers'
    }

    @Get('/user/:id/')
    getUserById() {
        return 'getUserById!'
    }
}
