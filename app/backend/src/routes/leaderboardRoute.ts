import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';

const leaderboardRoutes = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);
leaderboardRoutes.get('/home', leaderboardController.getHome);
leaderboardRoutes.get('/away', leaderboardController.getAway);

export default leaderboardRoutes;
