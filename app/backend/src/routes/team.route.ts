import { Router } from 'express';
import Team from '../database/models/team.model';
import TeamController from '../controllers/team.controller';
import TeamService from '../services/team.service';

const teamRoutes = Router();
const teamService = new TeamService(Team);
const teamController = new TeamController(teamService);
teamRoutes.get('/', teamController.getAll);
teamRoutes.get('/:id', teamController.getById);

export default teamRoutes;
