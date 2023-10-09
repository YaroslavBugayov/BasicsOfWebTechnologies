"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(user, profile) {
        this.name = profile.name;
        this.group = profile.group;
        this.idCard = profile.idCard;
        this.birthDate = profile.birthDate;
        this.email = user.email;
    }
}
exports.default = UserDto;
