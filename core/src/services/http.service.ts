import * as http from 'node:http';
import { RouterService } from "./router.service";
import { Injectable, Resolver } from "../decorators";
import {makeLogger} from "ts-loader/dist/logger";
import * as Stream from "stream";

@Injectable
export class HttpService {
    private readonly server = http.createServer();

    @Resolver
    private routerService: RouterService

    // @Resolver
    // private authService: AuthService
    private on(event: string, listener: (req: http.IncomingMessage, res: http.ServerResponse) => void) {
        this.server.on(event, listener)
    }

    init() {
        this.on('request',async (req, res) => {
            const response = await this.routerService.run(req.url, {})

            res.write(JSON.stringify(response) || '', 'utf8')
            res.end()
        })

        this.on('error', (error) => {
            console.log(error)
        })
    }

    /*async*/ listen(port = 5000, host = '0.0.0.0') {
        // return new Promise((resolve) => {
            this.server.listen(port, host, () => {
                console.log(`Application started on port ${port} and host - ${host}`)
                // resolve(true)
            })
        // })
    }
}


