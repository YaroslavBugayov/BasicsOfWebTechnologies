import {PrismaClient, Role} from "@prisma/client";
import { userService } from "../services/user.service";

const prisma = new PrismaClient();

const userBody = {
    name: 'Moderator',
    group: 'Moderator',
    idCard: 'Moderator',
    birthDate: 'Moderator',
    email: "moderator@moderator.com",
    password: "12345678",
    role: Role.MODERATOR
}

// prisma.profile.create({
//             data: {
//                 name: userBody.name,
//                 group: userBody.group,
//                 idCard: userBody.idCard,
//                 birthDate: userBody.birthDate,
//                 userId: 17
//             }
//         }).then(()=>console.log('success')).catch((error)=>console.log(error))

userService.hashPassword(userBody.password).then(hashedPassword => {
    prisma.user.create({
        data: {
            email: userBody.email,
            password: hashedPassword,
            role: userBody.role
        }
    }).then(user => {
        prisma.profile.create({
            data: {
                name: userBody.name,
                group: userBody.group,
                idCard: userBody.idCard,
                birthDate: userBody.birthDate,
                userId: user.id
            }
        });
    })
})