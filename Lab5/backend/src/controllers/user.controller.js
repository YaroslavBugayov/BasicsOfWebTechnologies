"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
exports.userController = {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, tokens } = yield user_service_1.userService.registration(req.body);
                res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 360000, httpOnly: true });
                res.header('Authorization', tokens.accessToken);
                return res.status(201).json({ 'user': user });
            }
            catch (error) {
                return next(error);
            }
        });
    },
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, tokens } = yield user_service_1.userService.login(req.body);
                res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 360000, httpOnly: true });
                res.header('Authorization', tokens.accessToken);
                return res.status(200).json({ 'user': user });
            }
            catch (error) {
                return next(error);
            }
        });
    },
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                yield user_service_1.userService.logout(refreshToken);
                res.clearCookie('refreshToken');
                return res.status(200).json({ 'message': 'success' });
            }
            catch (error) {
                return next(error);
            }
        });
    },
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const { user, tokens } = yield user_service_1.userService.refresh(refreshToken);
                res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 360000, httpOnly: true });
                res.header('Authorization', tokens.accessToken);
                return res.status(200).json({ 'user': user });
            }
            catch (error) {
                return next(error);
            }
        });
    },
};
