import {ApiError} from "../errors/api.error";
import {NextFunction, Request, Response} from "express";
import {ValidationError} from "express-validation";

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);

    if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message, errors: error.errors });
    }
    if (error instanceof ValidationError) {
        return res.status(error.statusCode).json( { message: error.details.body?.map(elem => elem.message) });
    }

    return res.status(500).json({ message: 'Something went wrong' });
}