import { Router } from 'express';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import Token from '../utils/jwt';
import AuthMiddleware from '../middlewares/auth.middleware';

const matchRoutes = Router();
const token = new Token();
const { auth } = new AuthMiddleware(token);
const matchService = new MatchService(Match, Team);
const matchController = new MatchController(matchService);
matchRoutes.get('/', matchController.getAll);
matchRoutes.use(auth);
matchRoutes.patch('/:id/finish', matchController.updateToFinished);

export default matchRoutes;
