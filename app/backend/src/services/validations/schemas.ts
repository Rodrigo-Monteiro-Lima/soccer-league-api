import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'string.min': 'Invalid email or password',
  'string.empty': 'All fields must be filled',
  'any.required': 'All fields must be filled',
  'string.email': 'Invalid email or password',
}).required();

export default loginSchema;
