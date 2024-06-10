//Middleware to handle the errors at application level

export default class ApplicationError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}