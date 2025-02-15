export class CreateUserRequest {
    constructor(
        public readonly name: string,
        public readonly email: string,
    ) { }
}