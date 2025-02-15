export class Response {
    constructor(
        readonly success: boolean,
        readonly statusCode: number,
        readonly message: string,
    ) {
    }
}
