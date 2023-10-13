import * as http from 'node:http';
import { RouterService } from "./router.service";
import { Injectable, Resolver } from "../decorators";
import type { Context } from "../types";

@Injectable
export class HttpService {
    private readonly server = http.createServer();

    @Resolver
    private routerService: RouterService

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
                const context: Context = {
                    method: req.method,
                    query: this.getQueries(req),
                }

                const response = await this.routerService.run(this.getPathname(req), context)

                try {
                    context.body = JSON.parse(body)
                } catch(error) {
                    // подумать как сделать так, чтобы при инвалидном JSON и запросах PUT, POST, etc боди было пустым
                }

                res.write(JSON.stringify(response))
                res.end()
            })
        })

        this.on('error', (error) => {
            console.log(error)
        })
    }

    private getQueries(req: http.IncomingMessage): Record<string, string> {
        const url = this.decomposeUrl(req);

        const queries = {}

        new URLSearchParams(url.search).forEach((value, key) => {
            queries[key] = value
        });

        return queries
    }

    private getPathname(req: http.IncomingMessage): string {
        return this.decomposeUrl(req).pathname
    }

    private decomposeUrl(req: http.IncomingMessage): URL {
        return new URL(req.url, `${req.headers['x-forwarded-proto']}://${req.headers.host}/`);
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


