import {Joi} from "express-validation";

export const validations = {
    loginValidation: {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .regex(/^(?=\S{8,}$).*/)
                .required()
        })
    },

    registrationValidation: {
        body: Joi.object({
            name: Joi.string()
                .regex(/^[A-Z][a-z]+\s[A-Z][a-z]+$/)
                .required(),
            group: Joi.string()
                .regex(/^[A-Z][A-Z]-[0-9][0-9]$/)
                .required(),
            idCard: Joi.string()
                .regex(/^[A-Z][A-Z]\s№[0-9]{6}$/)
                .required(),
            birthDate: Joi.string()
                .regex(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[1-2][0-9]{3}$/)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .regex(/^(?=\S{8,}$).*/)
                .required()
        })
    },

    profileChangeValidation: {
        body: Joi.object({
            name: Joi.string()
                .regex(/^[A-Z][a-z]+\s[A-Z][a-z]+$/)
                .required(),
            group: Joi.string()
                .regex(/^[A-Z][A-Z]-[0-9][0-9]$/)
                .required(),
            idCard: Joi.string()
                .regex(/^[A-Z][A-Z]\s№[0-9]{6}$/)
                .required(),
            birthDate: Joi.string()
                .regex(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[1-2][0-9]{3}$/)
                .required()
        })
    }
}