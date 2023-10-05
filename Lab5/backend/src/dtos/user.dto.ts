import {Profile, User} from "@prisma/client";

export default class UserDto {
    name: string;
    group: string;
    idCard: string;
    birthDate: string;
    email: string;

    constructor(user: User, profile: Profile) {
        this.name = profile.name;
        this.group = profile.group;
        this.idCard = profile.idCard;
        this.birthDate = profile.birthDate;
        this.email = user.email;
    }

}