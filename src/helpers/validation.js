import Joi from 'joi';

export const PageNameSchema = {
  name: Joi.string()
    .min(4)
    .required()
};

export const schemaTitleQuest = {
  body: Joi.string()
    .min(4)
    .required()
};

export const schemaAnswer = {
  body: Joi.string()
    .min(2)
    .required()
};

export const schemaLogin = {
  login: Joi.string()
    .email()
    .required()
};

export const schemaPassword = {
  password: Joi.string()
    .min(6)
    .regex(/^(?=(.*\d){2,})/)
    .regex(/^(?=.*[A-Z]{1,})/)
    .trim()
};

export const schemaUserName = {
  firstName: Joi.string()
    .trim()
    .min(2)
    .required()
};

export const validation = (value, schema, key) => {
  return Joi.validate(value, schema[key]);
};
