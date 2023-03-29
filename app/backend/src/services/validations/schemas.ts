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

const updateMatchSchema = Joi.object({
  homeTeamGoals: Joi.number().integer().min(0).required(),
  awayTeamGoals: Joi.number().integer().min(0).required(),
});

const newMatchSchema = Joi.object({
  homeTeamId: Joi.number().integer().required(),
  awayTeamId: Joi.number().integer().required(),
  homeTeamGoals: Joi.number().integer().required(),
  awayTeamGoals: Joi.number().integer().required(),
});

export {
  loginSchema,
  updateMatchSchema,
  newMatchSchema,
};
