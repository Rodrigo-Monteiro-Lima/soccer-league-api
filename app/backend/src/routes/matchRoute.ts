import { Router } from 'express';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';

const matchRoutes = Router();
const matchService = new MatchService(Match, Team);
const matchController = new MatchController(matchService);
matchRoutes.get('/', matchController.getAll);

export default matchRoutes;
