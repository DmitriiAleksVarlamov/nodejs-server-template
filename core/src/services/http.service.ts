import * as http from 'node:http';
import { RouterService } from "./router.service";
import { Injectable, Resolver } from "../decorators";
import {makeLogger} from "ts-loader/dist/logger";
import * as Stream from "stream";
import { pipeline } from 'stream/promises';

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
            let body = ''
            req.setEncoding('utf8')

            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', async () => {
                let response: Record<string, unknown>

                try {
                    const data = JSON.parse(body)

                    response = await this.routerService.run(req.url, {
                        body: data,
                        method: req.method,
                    })
                } catch(error) {
                    response = { status: 400, message: error.message }
                }


                res.write(JSON.stringify(response))
                res.end()
            })
        })

        this.on('error', (error) => {
            console.log(error)
        })
    }

    async getBody(req: http.IncomingMessage) {
        const  pipelinePromise = await pipeline(
            req,
            async function* (source) {
                for await (const chunk of source) {
                    yield chunk
                }
            },
        );
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


