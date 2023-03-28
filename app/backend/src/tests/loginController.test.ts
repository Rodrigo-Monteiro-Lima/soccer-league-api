import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
chai.use(chaiHttp);
const { expect } = chai;
import { app } from '../app';
import User from '../database/models/user.model'
import Token from '../utils/jwt'
import * as bycrypt from "bcryptjs";
import { login, loginWithInvalidEmail, loginWithInvalidPassword, tkn, user, userFromToken, userWithIncorrectPassword } from './mocks/login.mock';
import AuthMiddleware from '../middlewares/auth.middleware';

const token = new Token();
const auth = new AuthMiddleware(token);

describe('Testing login controller', () => {
  afterEach(() => {
    Sinon.restore();
  })
  describe('Successful login', function () {
    it('Should return status 200 and a token', async () => {
      Sinon.stub(User, 'findOne').resolves(user);
      Sinon.stub(bycrypt, 'compareSync').returns(true);
      Sinon.stub(jwt, 'sign').resolves('I5MX0.0WurIgnPyjjhdI4AXyX9qbXKer_J0hgQ-wipZIPHUVk')
      const response: Response = await chai.request(app).post('/login').send(login);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ token: 'I5MX0.0WurIgnPyjjhdI4AXyX9qbXKer_J0hgQ-wipZIPHUVk' })
    });
  });
  describe('Failed login', function () {
    it('Should return status 400 when not passing any field', async () => {
      const response: Response = await chai.request(app).post('/login').send();
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
    it('Should return status 401 when password does not have 6 characters long', async () => {
      const response: Response = await chai.request(app).post('/login').send(loginWithInvalidPassword);
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });
    it('Should return status 401 when the email is invalid', async () => {
      const response: Response = await chai.request(app).post('/login').send(loginWithInvalidEmail);
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });
    it('Should return status 401 when password does not match', async () => {
      Sinon.stub(User, 'findOne').resolves(userWithIncorrectPassword);
      Sinon.stub(bycrypt, 'compareSync').returns(false);
      const response: Response = await chai.request(app).post('/login').send(login);
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });
  });
  describe('Returns an error on token validation', function () {
    it('When a token is not passed', async function () {
      const response: Response = await chai.request(app).get('/login/role');
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Token not found' });
    });
    it('when the token is invalid', async function () {
      Sinon.stub(auth, 'auth').resolves();
      Sinon.stub(token, 'authToken').resolves(userFromToken);
      const response: Response = await chai.request(app).get('/login/role')
        .set({ Authorization: `${tkn}` })
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token' });
    })
  })
  describe('Returns the role', function () {
    it('When a valid token is passed', async function () {
      Sinon.stub(token, 'authToken').resolves(userFromToken);
      Sinon.stub(jwt, 'verify').resolves(userFromToken);
      const response: Response = await chai.request(app).get('/login/role').auth(tkn, { type: 'bearer' });
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ role: 'admin' });
    });
  })
});