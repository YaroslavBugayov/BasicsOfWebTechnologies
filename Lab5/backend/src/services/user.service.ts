import {compareSync, hashSync} from "bcrypt";
import {RegistrationBody} from "../bodies/registration.body";
import {PrismaClient, Profile, User} from "@prisma/client";
import UserDto from "../dtos/user.dto";
import {ApiError} from "../errors/api.error";
import TokensDto from "../dtos/tokens.dto";
import {tokenService} from "./tokenService";

const prisma = new PrismaClient();

export const userService = {
    async registration(userBody: RegistrationBody) : Promise<{ user: UserDto, tokens: TokensDto }> {
        const candidate = await prisma.user.findUnique({
            where: {
                email: userBody.email
            }
        })

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
    }
}

const saveToken = async (user: User, profile: Profile) : Promise<{ user: UserDto, tokens: TokensDto }> => {
    const userDto: UserDto = new UserDto(user, profile);
    const { refreshToken, accessToken } = await tokenService.generateTokens(user.id);
    const tokensDto: TokensDto = new TokensDto(refreshToken, accessToken);
    return { user: userDto, tokens: tokensDto }
}