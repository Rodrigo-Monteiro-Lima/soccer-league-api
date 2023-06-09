import * as express from 'express';
import 'express-async-errors';
import * as cors from 'cors';
import teamRoutes from './routes/team.route';
import ErrorHandler from './middlewares/errorHandler.middleware';
import loginRoutes from './routes/login.route';
import matchRoutes from './routes/matchRoute';
import leaderboardRoutes from './routes/leaderboardRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.initRoutes();
    this.initMiddlewares();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(cors());
  }

  private initRoutes(): void {
    this.app.use('/teams', teamRoutes);
    this.app.use('/login', loginRoutes);
    this.app.use('/matches', matchRoutes);
    this.app.use('/leaderboard', leaderboardRoutes);
  }

  private initMiddlewares() {
    this.app.use(ErrorHandler.handle);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
