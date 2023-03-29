import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
chai.use(chaiHttp);
const { expect } = chai;
import { app } from '../app';
import Match from '../database/models/match.model'
import Team from '../database/models/team.model'
import Token from '../utils/jwt'
import { match, matches, newMatch, newMatchBody, newMatchBodyWithInvalidId, newMatchBodyWithSameId, tkn, updateMatch, user } from './mocks/match.mock';

const token = new Token()


describe('Testing match controller', () => {
  afterEach(() => {
    Sinon.restore();
  })
  describe('Getting matches', function () {
    it('Should return status 200 and a list of matches', async () => {
      Sinon.stub(Match, 'findAll').resolves(matches);
      const response: Response = await chai.request(app).get('/matches');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matches);
    });
  });
  describe('Filtering matches', function () {
    it('Should return status 200 and the filtered matches', async () => {
      Sinon.stub(Match, 'findAll').resolves(matches);
      const response: Response = await chai.request(app).get('/matches?inProgress=true');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal([matches[1]]);
    });
  });
  describe('Update a match to finished', function () {
    it('return updated match', async function () {
      Sinon.stub(token, 'authToken').resolves(user);
      Sinon.stub(jwt, 'verify').resolves(user);
      Sinon.stub(Match, 'findByPk').resolves(match);
      const response: Response = await chai.request(app).patch('/matches/2/finish')
        .auth(tkn, { type: 'bearer' });
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
    it('Should return status 404 and a message', async function () {
      Sinon.stub(token, 'authToken').resolves(user);
      Sinon.stub(jwt, 'verify').resolves(user);
      Sinon.stub(Match, 'findByPk').resolves(null);
      const response: Response = await chai.request(app).patch('/matches/2000/finish')
        .auth(tkn, { type: 'bearer' });
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'Match not found' });
    })
  })
  describe('Create a match', function () {
    it('Should return 200 and the new match', async function () {
      Sinon.stub(token, 'authToken').resolves(user);
      Sinon.stub(jwt, 'verify').resolves(user);
      Sinon.stub(Match, 'create').resolves(newMatch)
      const response: Response = await chai.request(app).post('/matches').send(newMatchBody)
        .auth(tkn, { type: 'bearer' });
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(newMatch);
    });
    it('Should return status 422 when not passing any field', async () => {
      Sinon.stub(token, 'authToken').resolves(user);
      Sinon.stub(jwt, 'verify').resolves(user);
      const response: Response = await chai.request(app).post('/matches').send()
        .auth(tkn, { type: 'bearer' });
      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({ message: '"homeTeamId" is required' });
    });
    it('Should return status 422 when passing same ids', async function () {
      Sinon.stub(token, 'authToken').resolves(user);
      Sinon.stub(jwt, 'verify').resolves(user);
      const response: Response = await chai.request(app).post('/matches').send(newMatchBodyWithSameId)
        .auth(tkn, { type: 'bearer' });
      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });
    it('Should return status 400 when not found teams', async function () {
      Sinon.stub(token, 'authToken').resolves(user);
      Sinon.stub(jwt, 'verify').resolves(user);
      Sinon.stub(Team, 'findByPk').resolves(null);
      const response: Response = await chai.request(app).post('/matches').send(newMatchBodyWithInvalidId)
        .auth(tkn, { type: 'bearer' });
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!' });
    })
  })
  describe('Update a match', function () {
    it('Should return status 422 when not sending any field', async () => {
      Sinon.stub(token, 'authToken').resolves(user);
      Sinon.stub(jwt, 'verify').resolves(user);
      const response: Response = await chai.request(app).patch('/matches/1').send()
        .auth(tkn, { type: 'bearer' });
      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({ message: '"homeTeamGoals" is required' });
    });
    it('Should return status 404 when not finding id', async function () {
      Sinon.stub(token, 'authToken').resolves(user);
      Sinon.stub(jwt, 'verify').resolves(user);
      Sinon.stub(Match, 'findByPk').resolves(null);
      const response: Response = await chai.request(app).patch('/matches/1000').send(updateMatch)
        .auth(tkn, { type: 'bearer' });
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'Match not found' });
    });
    it('Should return status 200 and the updated match', async function () {
      Sinon.stub(token, 'authToken').resolves(user);
      Sinon.stub(jwt, 'verify').resolves(user);
      Sinon.stub(Match, 'findByPk').resolves(match);
      Sinon.stub(Match, 'update').resolves();
      const response: Response = await chai.request(app).patch('/matches/2').send(updateMatch)
        .auth(tkn, { type: 'bearer' });
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ ...match, ...updateMatch });
    });
  })
});