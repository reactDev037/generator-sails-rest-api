"use strict";

const path = require('path');
const assert = require('yeoman-assert');
const test = require('yeoman-test');

describe('sails-rest-api:authentication', () => {
  describe('Should properly scaffold default authentication layer', () => {
    before(() => test.run(path.join(__dirname, '../../generators/authentication')));

    it('Should properly create api files', () => {
      assert.file([
        'api/controllers/AuthController.js',
        'api/controllers/UserController.js',
        'api/models/User.js',
        'api/policies/isAuthenticated.js'
      ]);
    });

    it('Should properly create configuration files', () => {
      assert.file([
        'config/passport.js',
        'config/policies.js'
      ]);

      assert.fileContent('config/passport.js', /secretOrKey: 'DEFAULT_SECRET_KEY'/);
    });

    it('Should properly create test files', () => {
      assert.file([
        'test/unit/controllers/AuthController.test.js',
        'test/unit/controllers/UserController.test.js',
        'test/unit/models/User.test.js',
        'test/unit/policies/isAuthenticated.test.js'
      ]);
    });
  });

  describe('Should properly scaffold authentication layer with custom secret key', () => {
    before(() => {
      return test
        .run(path.join(__dirname, '../../generators/authentication'))
        .withOptions({
          'secret-key': '1234567890'
        })
    });

    it('Should properly create api files', () => {
      assert.file([
        'api/controllers/AuthController.js',
        'api/controllers/UserController.js',
        'api/models/User.js',
        'api/policies/isAuthenticated.js'
      ]);
    });

    it('Should properly create configuration files', () => {
      assert.file([
        'config/passport.js',
        'config/policies.js'
      ]);

      assert.fileContent('config/passport.js', /secretOrKey: '1234567890'/);
    });

    it('Should properly create test files', () => {
      assert.file([
        'test/unit/controllers/AuthController.test.js',
        'test/unit/controllers/UserController.test.js',
        'test/unit/models/User.test.js',
        'test/unit/policies/isAuthenticated.test.js'
      ]);
    });
  });
});
