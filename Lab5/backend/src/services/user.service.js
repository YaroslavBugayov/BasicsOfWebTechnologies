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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = require("bcrypt");
const client_1 = require("@prisma/client");
const user_dto_1 = __importDefault(require("../dtos/user.dto"));
const api_error_1 = require("../errors/api.error");
const tokens_dto_1 = __importDefault(require("../dtos/tokens.dto"));
const token_service_1 = require("./token.service");
const prisma = new client_1.PrismaClient();
exports.userService = {
    registration(userBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield prisma.user.findUnique({
                where: {
                    email: userBody.email
                }
            });
            if (candidate) {
                throw api_error_1.ApiError.BadRequest('User already exists');
            }
            const hashedPassword = (0, bcrypt_1.hashSync)(userBody.password, 10);
            const user = yield prisma.user.create({
                data: {
                    email: userBody.email,
                    password: hashedPassword
                }
            });
            const profile = yield prisma.profile.create({
                data: {
                    name: userBody.name,
                    group: userBody.group,
                    idCard: userBody.idCard,
                    birthDate: userBody.birthDate,
                    userId: user.id
                }
            });
            return yield saveToken(user, profile);
        });
    },
    login(userBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { email: userBody.email }
            });
            if (!user) {
                throw api_error_1.ApiError.BadRequest('User not found');
            }
            if (!(0, bcrypt_1.compareSync)(userBody.password, user.password)) {
                throw api_error_1.ApiError.BadRequest('Incorrect password');
            }
            const profile = yield prisma.profile.findUnique({
                where: {
                    userId: user.id
                }
            });
            if (!profile) {
                throw api_error_1.ApiError.BadRequest('This user don\'t have a profile');
            }
            return yield saveToken(user, profile);
        });
    },
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            return yield token_service_1.tokenService.removeToken(refreshToken);
        });
    },
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const userId = token_service_1.tokenService.validateRefreshToken(refreshToken);
            const token = yield token_service_1.tokenService.findToken(refreshToken);
            if (!userId || !token) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const user = yield exports.userService.find(userId);
            const profile = yield prisma.profile.findUnique({
                where: {
                    userId: userId
                }
            });
            if (!profile) {
                throw api_error_1.ApiError.BadRequest('This user don\'t have a profile');
            }
            return yield saveToken(user, profile);
        });
    },
    find(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                throw api_error_1.ApiError.BadRequest("User not found");
            }
            return user;
        });
    }
};
const saveToken = (user, profile) => __awaiter(void 0, void 0, void 0, function* () {
    const userDto = new user_dto_1.default(user, profile);
    const { refreshToken, accessToken } = yield token_service_1.tokenService.generateTokens(user.id);
    yield token_service_1.tokenService.saveToken(user.id, refreshToken);
    const tokensDto = new tokens_dto_1.default(refreshToken, accessToken);
    return { user: userDto, tokens: tokensDto };
});
