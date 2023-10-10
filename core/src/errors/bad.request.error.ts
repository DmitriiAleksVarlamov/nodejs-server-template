import {StatusCodes} from "../types";

export class BadRequestError extends Error {
    constructor(message: string, private status: StatusCodes) {
        super(message)
    }
}
