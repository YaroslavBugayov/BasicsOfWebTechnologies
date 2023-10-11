import {NextFunction, Response} from "express";
import {profileService} from "../services/profile.service";
import {AuthenticatedRequest} from "../interfaces/authenticated-request.interface";
import {ChangeProfileBody} from "../bodies/change-profile.body";

export const profileController = {
    async change(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const profile = await profileService.change(req.body as ChangeProfileBody, req.userId as number);
            return res.status(201).json({ 'profile': profile });
        } catch (error) {
            return next(error);
        }
    },

    async changeById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const profile = await profileService.change(req.body as ChangeProfileBody, parseInt(req.params.id));
            return res.status(201).json({ 'profile': profile });
        } catch (error) {
            return next(error);
        }
    },

    async get(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const profile = await profileService.get(req.userId as number);
            return res.status(200).json({ 'profile': profile });
        } catch (error) {
            return next(error);
        }
    },

    async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const profile = await profileService.get(parseInt(req.params.id));
            return res.status(200).json({ 'profile': profile });
        } catch (error) {
            return next(error);
        }
    }
}