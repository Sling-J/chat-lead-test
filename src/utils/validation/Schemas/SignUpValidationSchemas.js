const Joi = require('joi');

export const validationSignUpEmailSchema = Joi.object().keys({
    login:
        Joi
        .string()
        .email({minDomainAtoms: 2})
        .required(),
});

export const validationSignUpPasswordSchema = Joi.object().keys({
    password:
        Joi
            .string()
            .regex(/^[a-zA-Z0-9]{6,30}$/)
            .required()
});