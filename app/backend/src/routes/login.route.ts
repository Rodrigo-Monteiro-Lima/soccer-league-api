import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginValidation from '../services/validations/loginValidations';
import LoginService from '../services/login.service';
import Token from '../utils/jwt';
import User from '../database/models/user.model';

const loginRoutes = Router();
const token = new Token();
const loginValidation = new LoginValidation();
const loginService = new LoginService(token, User, loginValidation);
const loginController = new LoginController(loginService);
loginRoutes.post('/', loginController.login);

export default loginRoutes;
