import { Response } from "./response.entity";

export class DataResponse<T> extends Response {
    constructor(
        readonly data: T | Array<T>,
        statusCode: number = 200,
        message: string = 'OK',
    ) {
        super(true, statusCode, message);
    }
}