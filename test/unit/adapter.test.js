"use strict";

const path = require('path');
const assert = require('yeoman-assert');
const test = require('yeoman-test');

describe('sails-rest-api:adapter', () => {
  describe('Should properly scaffold adapter', () => {
    before(() => test.run(path.join(__dirname, '../../generators/adapter')).withArguments(['mongo']));

    it('Should properly create api files', () => {
      assert.file([
        'api/adapters/MongoAdapter.js'
      ]);

      assert.fileContent('api/adapters/MongoAdapter.js', /let connections = \{\};/);
    });

    it('Should properly create test files', () => {
      assert.file([
        'test/unit/adapters/MongoAdapter.test.js'
      ]);

      assert.fileContent('test/unit/adapters/MongoAdapter.test.js', /const Adapter = require\('\.\.\/\.\.\/\.\.\/api\/adapters\/MongoAdapter'\)/);
    });
  });
});
