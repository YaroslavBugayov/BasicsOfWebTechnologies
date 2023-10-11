import {compareSync, hashSync} from "bcrypt";
import {RegistrationBody} from "../bodies/registration.body";
import {PrismaClient, Profile, Role, Token, User} from "@prisma/client";
import UserDto from "../dtos/user.dto";
import {ApiError} from "../errors/api.error";
import TokensDto from "../dtos/tokens.dto";
import {tokenService} from "./token.service";
import {LoginBody} from "../bodies/login.body";
import {ChangeProfileBody} from "../bodies/change-profile.body";

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

        const hashedPassword = await this.hashPassword(userBody.password);

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

        const user = await userService.find(userId);

        const profile: Profile | null = await prisma.profile.findUnique({
            where: {
                userId: userId
            }
        })

        if (!profile) {
            throw ApiError.BadRequest('This user don\'t have a profile');
        }

        return await saveToken(user, profile);
    },

    async find(userId: number): Promise<User> {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw ApiError.BadRequest("User not found");
        }
        return user;
    },

    async checkRole(userId: number): Promise<Role> {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw ApiError.BadRequest("User not found");
        }
        return user.role;
    },

    async hashPassword(password: string): Promise<string> {
        return hashSync(password, 10);
    },

    async change(body: ChangeProfileBody, id: number): Promise<User> {
        let password: string | undefined
        if (body.password) {
            password = await this.hashPassword(body.password)
        }

        return prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: body.email,
                password: password
            }
        });
    }

}

const saveToken = async (user: User, profile: Profile) : Promise<{ user: UserDto, tokens: TokensDto }> => {
    const userDto: UserDto = new UserDto(user, profile);
    const { refreshToken, accessToken } = await tokenService.generateTokens(user.id);
    await tokenService.saveToken(user.id, refreshToken);
    const tokensDto: TokensDto = new TokensDto(refreshToken, accessToken);
    return { user: userDto, tokens: tokensDto };
}