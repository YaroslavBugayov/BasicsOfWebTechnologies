import {AuthenticatedRequest} from "../interfaces/authenticated-request.interface";
import {NextFunction, Response} from "express";
import {ApiError} from "../errors/api.error";
import {userService} from "../services/user.service";
import {Role} from "@prisma/client";

export default (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.userId) {
        return next(ApiError.UnauthorizedError());
    }
    userService.checkRole(req.userId)
        .then(role => {
            if (role != Role.ADMIN) {
                return next(ApiError.ForbiddenError());
            }
        })
        .catch(error => {
            return next(ApiError.BadRequest(error))
        })
        .finally(() => {
            return next();
        })
}