import jwt, {sign} from 'jsonwebtoken';
import {PrismaClient, Token} from '@prisma/client';
import {JwtPayloadModel} from '../models/jwt-payload.model';

const prisma = new PrismaClient();

export const tokenService = {
    async generateTokens(id: number) : Promise<{ refreshToken: string, accessToken: string }> {
        const accessToken = sign(
            { userId: id },
            process.env.JWT_ACCESS_SECRET as string,
            { expiresIn: '30m' }
        );

        const refreshToken = sign(
            { userId: id },
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: '30d' }
        );

        return { accessToken, refreshToken };
    },

    async saveToken(userId: number, refreshToken: string) : Promise<Token> {
        const tokenData = await prisma.token.findUnique({
            where: {
                userId: userId
            }
        });

        return tokenData
            ? await prisma.token.update({
                where: {
                    userId: userId
                },
                data: {
                    refreshToken: refreshToken
                }
            })
            : await prisma.token.create({
                data: {
                    userId: userId,
                    refreshToken: refreshToken
                }
            });
    },

    async removeToken(refreshToken: string) : Promise<Token> {
        return prisma.token.delete({
            where: {
                refreshToken: refreshToken
            }
        });
    },

    async findToken(refreshToken: string) : Promise<Token | null> {
        return prisma.token.findUnique({
            where: {
                refreshToken: refreshToken
            }
        });
    },

    validateAccessToken(token: string) : number {
        const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayloadModel;
        return user.userId;
    },

    validateRefreshToken(token: string) : number {
        const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as JwtPayloadModel;
        return user.userId;
    }
}