import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import LoginController from '../controllers/login.controller';
import LoginValidation from '../services/validations/loginValidations';
import LoginService from '../services/login.service';
import Token from '../utils/jwt';
import User from '../database/models/user.model';

const loginRoutes = Router();
const token = new Token();
const loginValidation = new LoginValidation();
const { auth } = new AuthMiddleware(token);
const loginService = new LoginService(token, User, loginValidation);
const loginController = new LoginController(loginService);
loginRoutes.post('/', loginController.login);
loginRoutes.get('/role', auth, loginController.getRole);

export default loginRoutes;
