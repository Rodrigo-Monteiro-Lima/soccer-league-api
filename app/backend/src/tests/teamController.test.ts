import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
chai.use(chaiHttp);
const { expect } = chai;
import { app } from '../app';
import Team from '../database/models/team.model'
import teams from './mocks/team.mock';


describe('Testing team controller', () => {
  afterEach(() => {
    Sinon.restore();
  })
  describe('Listing teams', function () {
    it('Should return status 200 and teams list', async () => {
      Sinon.stub(Team, 'findAll').resolves(teams);
      const response: Response = await chai.request(app).get('/teams');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teams);
    });
  });
  describe('Listing a team', function () {
    it('Should return status 200 and team', async () => {
      Sinon.stub(Team, 'findByPk').resolves(teams[0]);
      const response: Response = await chai.request(app).get('/teams/1');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teams[0]);
    });
    it('Should return an error with a nonexistent id', async () => {
      Sinon.stub(Team, 'findByPk').resolves(null);
      const response: Response = await chai.request(app).get('/teams/19');
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'Team not found!' });
    });
  });
});