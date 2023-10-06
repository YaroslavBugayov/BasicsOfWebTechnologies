import {compareSync, hashSync} from "bcrypt";
import {RegistrationBody} from "../bodies/registration.body";
import {PrismaClient, Profile, Token, User} from "@prisma/client";
import UserDto from "../dtos/user.dto";
import {ApiError} from "../errors/api.error";
import TokensDto from "../dtos/tokens.dto";
import {tokenService} from "./tokenService";
import {LoginBody} from "../bodies/login.body";

const prisma = new PrismaClient();

export const userService = {
    async registration(userBody: RegistrationBody) : Promise<{ user: UserDto, tokens: TokensDto }> {
        const candidate = await prisma.user.findUnique({
            where: {
                email: userBody.email
            }
        });

        if (candidate) {
            throw ApiError.BadRequest('User already exists');
        }

        const hashedPassword = hashSync(userBody.password, 10);

        const user: User = await prisma.user.create({
            data: {
                email: userBody.email,
                password: hashedPassword
            }
        });

        const profile: Profile = await prisma.profile.create({
            data: {
                name: userBody.name,
                group: userBody.group,
                idCard: userBody.idCard,
                birthDate: userBody.birthDate,
                userId: user.id
            }
        });

        return await saveToken(user, profile);
    },

    async login(userBody: LoginBody) : Promise<{ user: UserDto, tokens: TokensDto }> {
        const user: User | null = await prisma.user.findUnique({
            where:
                { email: userBody.email }
        });

        if (!user) {
            throw ApiError.BadRequest('User not found');
        }

        if (!compareSync(userBody.password, user.password)) {
            throw ApiError.BadRequest('Incorrect password');
        }

        const profile: Profile | null = await prisma.profile.findUnique({
            where: {
                userId: user.id
            }
        });

        if (!profile) {
            throw ApiError.BadRequest('This user don\'t have a profile');
        }

        return await saveToken(user, profile);
    },

    async logout(refreshToken: string) : Promise<Token> {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        return await tokenService.removeToken(refreshToken);
    },

    async refresh(refreshToken: string) : Promise<{ user: UserDto, tokens: TokensDto }> {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userId = tokenService.validateRefreshToken(refreshToken);
        const token = await tokenService.findToken(refreshToken);

        if (!userId || !token) {
            throw ApiError.UnauthorizedError();
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw ApiError.BadRequest("User not found");
        }

        const profile: Profile | null = await prisma.profile.findUnique({
            where: {
                userId: userId
            }
        })

        if (!profile) {
            throw ApiError.BadRequest('This user don\'t have a profile');
        }

        return await saveToken(user, profile);
    }
}

const saveToken = async (user: User, profile: Profile) : Promise<{ user: UserDto, tokens: TokensDto }> => {
    const userDto: UserDto = new UserDto(user, profile);
    const { refreshToken, accessToken } = await tokenService.generateTokens(user.id);
    await tokenService.saveToken(user.id, refreshToken);
    const tokensDto: TokensDto = new TokensDto(refreshToken, accessToken);
    return { user: userDto, tokens: tokensDto };
}