export class Pagination {
    constructor(
        public totalItems: number,
        public currentPage: number,
        public totalPages: number,
        public nextPage?: number,
        public prevPage?: number,
    ) { }
}