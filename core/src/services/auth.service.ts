import { Injectable } from "../decorators";

@Injectable
export class AuthService {
    init() {
        console.log('AuthService')
    }
}
