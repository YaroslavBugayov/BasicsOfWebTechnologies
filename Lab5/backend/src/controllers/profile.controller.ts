import {NextFunction, Request, Response} from "express";
import {profileService} from "../services/profile.service";
import {AuthenticatedRequest} from "../interfaces/authenticated-request.interface";

export const profileController = {
    async change(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            return res.status(201).json()
        } catch (error) {
            return next(error);
        }
    },

    async get(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const profile = await profileService.get(req.userId as number)
            return res.status(200).json({ 'profile': profile });
        } catch (error) {
            return next(error);
        }
    }
}