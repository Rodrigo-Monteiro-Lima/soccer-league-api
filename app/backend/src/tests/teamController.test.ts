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
});