const Joi = require("@hapi/joi");
function validateEmployee(user) {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  return schema.validate(user);
}
function validateRegister(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(11).required(),
  });

  return schema.validate(user);
}
module.exports.validateEmployee = validateEmployee;
module.exports.validateRegister = validateRegister;
