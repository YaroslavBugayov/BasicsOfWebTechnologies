"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = require("../errors/api.error");
const token_service_1 = require("../services/token.service");
exports.default = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(api_error_1.ApiError.UnauthorizedError());
        }
        const accessToken = authHeader.split(' ')[1];
        const userId = token_service_1.tokenService.validateAccessToken(accessToken);
        if (!userId) {
            return next(api_error_1.ApiError.UnauthorizedError());
        }
        req.userId = userId;
        return next();
    }
    catch (error) {
        return next(api_error_1.ApiError.UnauthorizedError());
    }
};
