import { CustomException } from './custom.exception';

export class UserNotFoundException extends CustomException {
    constructor() {
        super('User not found', 404);
    }
}