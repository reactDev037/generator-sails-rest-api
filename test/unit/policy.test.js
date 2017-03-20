"use strict";

const path = require('path');
const assert = require('yeoman-assert');
const test = require('yeoman-test');

describe('sails-rest-api:policy', () => {
  describe('Should properly scaffold policy', () => {
    before(() => {
      return test
        .run(path.join(__dirname, '../../generators/policy'))
        .withArguments(['IsAdmin'])
    });

    it('Should properly create api files', () => {
      assert.file([
        'api/policies/isAdmin.js'
      ]);

      assert.fileContent('api/policies/isAdmin.js', /module.exports = \(req, res, next\)/);
    });

    it('Should properly create test files', () => {
      assert.file([
        'test/unit/policies/isAdmin.test.js'
      ]);

      assert.fileContent('test/unit/policies/isAdmin.test.js', /const Policy = require\('\.\.\/\.\.\/\.\.\/api\/policies\/isAdmin'\)/);
    });
  });
});
