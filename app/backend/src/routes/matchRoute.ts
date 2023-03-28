import { Router } from 'express';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import Token from '../utils/jwt';
import AuthMiddleware from '../middlewares/auth.middleware';
import MatchValidations from '../services/validations/matchValidation';

const matchRoutes = Router();
const token = new Token();
const { auth } = new AuthMiddleware(token);
const matchValidation = new MatchValidations();
const matchService = new MatchService(Match, Team, matchValidation);
const matchController = new MatchController(matchService);
matchRoutes.get('/', matchController.getAll);
matchRoutes.use(auth);
matchRoutes.patch('/:id/finish', matchController.updateToFinished);
matchRoutes.patch('/:id', matchController.update);

export default matchRoutes;
