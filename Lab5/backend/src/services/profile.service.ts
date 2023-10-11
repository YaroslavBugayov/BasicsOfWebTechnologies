import {PrismaClient, Profile, User} from "@prisma/client";
import {ApiError} from "../errors/api.error";
import UserDto from "../dtos/user.dto";
import {userService} from "./user.service";
import {ProfileModel} from "../models/profile.model";
import {ChangeProfileBody} from "../bodies/change-profile.body";

const prisma = new PrismaClient();

export const profileService = {
    async get(userId: number): Promise<UserDto> {
        const user: User = await userService.find(userId);
        const profile: Profile = await profileService.find(userId);
        return new UserDto(user, profile);
    },

    async change(body: ChangeProfileBody, userId: number): Promise<UserDto> {
        let user: User = await userService.find(userId);
        if (body.email || body.password) {
            user = await userService.change(body, userId);
        }
        const profile: Profile = await prisma.profile.update({
            where: {
                userId: userId
            },
            data: {
                name: body.name,
                group: body.group,
                idCard: body.idCard,
                birthDate: body.birthDate,
            }
        });
        return new UserDto(user, profile);
    },

    async find(id: number): Promise<Profile> {
        const profile: Profile | null = await prisma.profile.findUnique({ where: { userId: id } });
        if (!profile) {
            throw ApiError.BadRequest('Profile not found');
        }
        return profile;
    }
}