import { DataResponse } from "./data-response.entity";
import { Pagination } from "./pagination.entity";

export class PaginatedDataResponse<T> extends DataResponse<T> {
    constructor(
        statusCode: number,
        data: T | Array<T>,
        message: string = 'OK',
        readonly pagination: Pagination,
    ) { 
        super(data, statusCode, message);
    }
}