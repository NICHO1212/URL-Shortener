const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(6).max(1024).required()
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(6).max(1024).required()
  });
  return schema.validate(data);
};

const addUrlValidation = (data) => {
  const schema = Joi.object().keys({
    url: Joi.string().required()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.addUrlValidation = addUrlValidation;