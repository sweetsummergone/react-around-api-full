const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// User

const validatedCreateOrLoginUserSchema = {
  body: Joi.object().keys({
    email: Joi.string().max(42).required().email({ minDomainSegments: 2 }),

    password: Joi.string().required().min(8).max(32)
      .required(),

    name: Joi.string().min(2).max(30),

    about: Joi.string().min(2).max(30),

    avatar: Joi.string().uri(),
  }),
};

const validatedUpdateUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),

    about: Joi.string().min(2).max(30).required(),
  }),
};

const validatedUpdateAvatarUserSchema = {
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
};

// Card

const validatedCreateCardSchema = {
  body: Joi.object().keys({
    name: Joi.string().max(30).min(2).required(),

    link: Joi.string().required().uri(),

    owner: Joi.objectId().required(),

    likes: Joi.array(),
  }),
};

const validatedDeleteCardSchema = {
  body: Joi.object().keys({
    owner: Joi.objectId().required(),
  }),
};

module.exports = {
  validatedCreateOrLoginUserSchema,
  validatedUpdateUserSchema,
  validatedUpdateAvatarUserSchema,
  validatedCreateCardSchema,
  validatedDeleteCardSchema,
};
