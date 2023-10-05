import {userService} from "../services/user.service";
import {NextFunction, Request, Response} from "express";
import {LoginBody} from "../bodies/login.body";
import {RegistrationBody} from "../bodies/registration.body";
import UserDto from "../dtos/user.dto";

export const userController = {
    async registration(req: Request, res: Response, next: NextFunction) : Promise<Response | undefined> {
        try {
            const { user, tokens } = await userService.registration(req.body as RegistrationBody);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 360000, httpOnly: true })
            return res.status(201).json({ 'user': user, 'tokens': tokens })
        } catch (error) {
            next(error)
        }
    },

    async login(req: Request, res: Response, next: NextFunction) : Promise<Response | undefined> {
        try {
            const { email, password } = req.body as LoginBody;
            return res.status(201)
        } catch (error) {
            next(error)
        }
    },

    async logout(req: Request, res: Response, next: NextFunction) : Promise<Response | undefined> {
        try {
            return res.status(201)
        } catch (error) {
            next(error)
        }
    },

    async refresh(req: Request, res: Response, next: NextFunction) : Promise<Response | undefined> {
        try {
            return res.status(201)
        } catch (error) {
            next(error)
        }
    },
}