/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const { response } = require('express');
const sinon = require('sinon');
const _ = require('lodash');

const authController = require('../../server/controllers/auth.controller');
const authService = require('../../server/services/auth.service');
const userService = require('../../server/services/user.service');

const sandbox = sinon.createSandbox();

describe('the authController', () => {
  let err;
  let errNexted;
  let responseStub;
  let authServiceStub;
  let userServiceStub;
  let nextStub;

  beforeEach(() => {
    responseStub = sandbox.stub(response);
    authServiceStub = sandbox.stub(authService);
    userServiceStub = sandbox.stub(userService);
    nextStub = (e) => { errorNexted = e; };
  });

  afterEach(() => {
    err = undefined;
    errorNexted = undefined;
    sandbox.restore();
  });

  describe('register()', () => {
    const request = {
      body: {
        username: 'testuser',
        password: 'testPassword',
        name: 'test guy',
      },
    };

    describe('when no errors occur during the method', () => {
      beforeEach(() => {
        authServiceStub.hashPassword.returns('hash');
      });
      const expectedSuccessResponse = {
        success: true,
        message: 'registration successful!',
      };
      it('then it should call to hash password and persist user', async () => {
        try {
          await authController.register(request, responseStub);
        } catch (e) {
          err = e;
        }

        const responseSent = responseStub.send.args[0][0];
        expect(responseSent).to.deep.equal(expectedSuccessResponse);

        expect(err).to.be.undefined;

        const usersSaved = userServiceStub.add.args[0][0];
        expect(usersSaved.password).to.equal('hash');
        expect(_.omit(usersSaved, 'password')).to.deep.equal(_.omit(request.body, 'password'));
      });
    });
    describe('when errors occur during dependency calls', () => {
      const error = new Error('an error occurred');

      it('then it should call next with error', async () => {
        authServiceStub.hashPassword.throws(error);
        try {
          await authController.register(request, responseStub, nextStub);
        } catch (e) {
          err = e;
        }

        expect(errorNexted.message).to.equal(error.message);

        expect(err).to.be.undefined;
      });
    });
  });
});
