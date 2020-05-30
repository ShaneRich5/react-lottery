export class UnsupportedBrowserError extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, UnsupportedBrowserError.prototype);
    }
}