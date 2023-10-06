import {PrismaClient, Profile, User} from "@prisma/client";
import {ApiError} from "../errors/api.error";
import UserDto from "../dtos/user.dto";

const prisma = new PrismaClient();

export const profileService = {
    async get(id: number): Promise<UserDto> {
        const user: User | null = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            throw ApiError.BadRequest('User not found');
        }

        const profile: Profile | null = await prisma.profile.findUnique({
            where: {
                userId: id
            }
        });

        if (!profile) {
            throw ApiError.BadRequest('Profile not found');
        }

        return new UserDto(user, profile);
    }
}