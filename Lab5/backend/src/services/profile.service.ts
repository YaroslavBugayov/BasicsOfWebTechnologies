import {PrismaClient, Profile, User} from "@prisma/client";
import {ApiError} from "../errors/api.error";
import UserDto from "../dtos/user.dto";
import {userService} from "./user.service";
import {ProfileModel} from "../models/profile.model";

const prisma = new PrismaClient();

export const profileService = {
    async get(userId: number): Promise<UserDto> {
        const user: User = await userService.find(userId);
        const profile: Profile = await profileService.find(userId);
        return new UserDto(user, profile);
    },

    async change(newProfile: ProfileModel, userId: number): Promise<UserDto> {
        const user: User = await userService.find(userId);
        await profileService.find(userId);
        const profile: Profile = await prisma.profile.update({
            where: {
                userId: userId
            },
            data: {
                name: newProfile.name,
                group: newProfile.group,
                idCard: newProfile.idCard,
                birthDate: newProfile.birthDate,
            }
        })
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