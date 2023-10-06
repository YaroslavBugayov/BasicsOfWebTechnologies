import {userService} from "../services/user.service";
import {NextFunction, Request, Response} from "express";
import {LoginBody} from "../bodies/login.body";
import {RegistrationBody} from "../bodies/registration.body";

export const userController = {
    async registration(req: Request, res: Response, next: NextFunction) : Promise<Response | void> {
        try {
            const { user, tokens } = await userService.registration(req.body as RegistrationBody);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 360000, httpOnly: true });
            res.header('Authorization', tokens.accessToken)
            return res.status(201).json({ 'user': user });
        } catch (error) {
            return next(error);
        }
    },

    async login(req: Request, res: Response, next: NextFunction) : Promise<Response | void> {
        try {
            const { user, tokens } = await userService.login(req.body as LoginBody);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 360000, httpOnly: true });
            res.header('Authorization', tokens.accessToken)
            return res.status(200).json({ 'user': user });
        } catch (error) {
            return next(error);
        }
    },

    async logout(req: Request, res: Response, next: NextFunction) : Promise<Response | void> {
        try {
            const { refreshToken } = req.cookies;
            await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json({ 'message': 'success' });
        } catch (error) {
            return next(error);
        }
    },

    async refresh(req: Request, res: Response, next: NextFunction) : Promise<Response | void> {
        try {
            const { refreshToken } = req.cookies;
            const { user, tokens } = await userService.refresh(refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 360000, httpOnly: true });
            res.header('Authorization', tokens.accessToken)
            return res.status(200).json({ 'user': user });
        } catch (error) {
            return next(error);
        }
    },
}