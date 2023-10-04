import {compareSync, hashSync} from "bcrypt";
import {RegistrationBody} from "../bodies/registration.body";
import {PrismaClient, Profile, User} from "@prisma/client";
import UserDto from "../dtos/user.dto";

const prisma = new PrismaClient();

export const userService = {
    async registration(userBody: RegistrationBody) {
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

        return new UserDto(user, profile);
    }
}