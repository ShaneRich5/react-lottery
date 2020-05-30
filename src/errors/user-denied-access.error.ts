export class UserDeniedAccessError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, UserDeniedAccessError.prototype);
    }
}