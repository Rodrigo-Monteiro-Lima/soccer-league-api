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
import { login, loginWithInvalidEmail, loginWithInvalidPassword, user, userWithIncorrectPassword } from './login.mock';

const token = new Token();

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
      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  });
});