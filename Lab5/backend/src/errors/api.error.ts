export class ApiError extends Error {
    status: number;
    errors: Error[];

    constructor(status: number, message: string, errors: Error[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message: string, errors: Error[] = []) {
        return new ApiError(400, message, errors);
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User not authorized');
    }

    static ForbiddenError() {
        return new ApiError(403, 'User don\'t have rights');
    }
}