import Joi from '@hapi/joi';

export const signupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .max(255)
      .required(),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(1024)
      .required(),
  });

  return schema.validate(data);
};

export const signinValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(1024)
      .required(),
  });

  return schema.validate(data);
};
