const Joi = require('joi');

const validatedUserSchema = Joi.object().keys({
  email: Joi.string().max(42).required().email({ minDomainSegments: 2 }),

  password: Joi.string().required().min(8).max(32)
    .required(),

  name: Joi.string().min(2).max(30),

  about: Joi.string().min(2).max(30),

  avatar: Joi.string().uri(),
});

module.exports = { validatedUserSchema };
