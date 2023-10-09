"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = require("../errors/api.error");
exports.default = (error, req, res, next) => {
    console.log(error);
    if (error instanceof api_error_1.ApiError) {
        return res.status(error.status).json({ message: error.message, errors: error.errors });
    }
    return res.status(500).json({ message: 'Something went wrong' });
};
