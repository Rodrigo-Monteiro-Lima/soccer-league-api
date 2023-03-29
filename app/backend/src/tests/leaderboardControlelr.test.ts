import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
chai.use(chaiHttp);
const { expect } = chai;
import { app } from '../app';
import sequelize from '../database/models';
import { away, home, metadata, resultSorted, resultWithoutSort } from './mocks/leaderboard.mock';

describe('Testing leaderboard controller', () => {
  afterEach(() => {
    Sinon.restore();
  })
  describe('Listing home teams leaderboard', function () {
    it('Should return status 200 and home teams leaderboard list', async () => {
      Sinon.stub(sequelize, 'query').resolves([home, metadata]);
      const response: Response = await chai.request(app).get('/leaderboard/home');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(home);
    });
  });
  describe('Listing away teams leaderboard', function () {
    it('Should return status 200 and away teams leaderboard list', async () => {
      Sinon.stub(sequelize, 'query').resolves([away, metadata]);
      const response: Response = await chai.request(app).get('/leaderboard/away');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(away);
    });
  });
  describe('Listing teams leaderboard', function () {
    it('Should return status 200 and teams leaderboard list', async () => {
      Sinon.stub(sequelize, 'query').resolves([resultWithoutSort, metadata]);
      const response: Response = await chai.request(app).get('/leaderboard');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(resultSorted);
    });
  });
});