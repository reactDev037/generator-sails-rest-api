"use strict";

const path = require('path');
const assert = require('yeoman-assert');
const test = require('yeoman-test');

describe('sails-rest-api:blueprint', () => {
  describe('Should properly scaffold blueprints without arguments and options', () => {
    before(() => test.run(path.join(__dirname, '../../generators/blueprint')));

    it('Should properly create api files', () => {
      assert.file([
        'api/blueprints/add.js',
        'api/blueprints/create.js',
        'api/blueprints/destroy.js',
        'api/blueprints/find.js',
        'api/blueprints/findone.js',
        'api/blueprints/populate.js',
        'api/blueprints/remove.js',
        'api/blueprints/update.js'
      ]);

      assert.noFile([
        'api/blueprints/custom.js'
      ]);
    });

    it('Should properly create test files', () => {
      assert.file([
        'test/unit/blueprints/add.test.js',
        'test/unit/blueprints/create.test.js',
        'test/unit/blueprints/destroy.test.js',
        'test/unit/blueprints/find.test.js',
        'test/unit/blueprints/findone.test.js',
        'test/unit/blueprints/populate.test.js',
        'test/unit/blueprints/remove.test.js',
        'test/unit/blueprints/update.test.js'
      ]);

      assert.noFile([
        'test/unit/blueprints/custom.test.js'
      ]);
    });
  });

  describe('Should properly scaffold predefined blueprint', () => {
    before(() => {
      return test
        .run(path.join(__dirname, '../../generators/blueprint'))
        .withArguments(['find'])
    });

    it('Should properly create api files', () => {
      assert.file([
        'api/blueprints/find.js'
      ]);

      assert.noFile([
        'api/blueprints/add.js',
        'api/blueprints/create.js',
        'api/blueprints/destroy.js',
        'api/blueprints/findone.js',
        'api/blueprints/populate.js',
        'api/blueprints/remove.js',
        'api/blueprints/update.js',
        'api/blueprints/test.js'
      ]);

      assert.fileContent('api/blueprints/find.js', /const populateAlias = \(model, alias\) => model.populate\(alias\);/);
    });

    it('Should properly create test files', () => {
      assert.file([
        'test/unit/blueprints/find.test.js'
      ]);

      assert.noFile([
        'test/unit/blueprints/add.test.js',
        'test/unit/blueprints/create.test.js',
        'test/unit/blueprints/destroy.test.js',
        'test/unit/blueprints/findone.test.js',
        'test/unit/blueprints/populate.test.js',
        'test/unit/blueprints/remove.test.js',
        'test/unit/blueprints/update.test.js',
        'test/unit/blueprints/test.test.js'
      ]);
    });
  });

  describe('Should properly scaffold overridden predefined blueprint', () => {
    before(() => {
      return test
        .run(path.join(__dirname, '../../generators/blueprint'))
        .withArguments(['find'])
        .withOptions({
          'new': true
        })
    });

    it('Should properly create api files', () => {
      assert.file([
        'api/blueprints/find.js'
      ]);

      assert.noFile([
        'api/blueprints/add.js',
        'api/blueprints/create.js',
        'api/blueprints/destroy.js',
        'api/blueprints/findone.js',
        'api/blueprints/populate.js',
        'api/blueprints/remove.js',
        'api/blueprints/update.js',
        'api/blueprints/test.js'
      ]);

      assert.fileContent('api/blueprints/find.js', /res.ok\(\)/);
      assert.noFileContent('api/blueprints/find.js', /const populateAlias = \(model, alias\) => model.populate\(alias\);/);
    });

    it('Should properly create test files', () => {
      assert.file([
        'test/unit/blueprints/find.test.js'
      ]);

      assert.noFile([
        'test/unit/blueprints/add.test.js',
        'test/unit/blueprints/create.test.js',
        'test/unit/blueprints/destroy.test.js',
        'test/unit/blueprints/findone.test.js',
        'test/unit/blueprints/populate.test.js',
        'test/unit/blueprints/remove.test.js',
        'test/unit/blueprints/update.test.js',
        'test/unit/blueprints/test.test.js'
      ]);
    });
  });

  describe('Should properly scaffold custom blueprint', () => {
    before(() => {
      return test
        .run(path.join(__dirname, '../../generators/blueprint'))
        .withArguments(['custom'])
    });

    it('Should properly create api files', () => {
      assert.file([
        'api/blueprints/custom.js'
      ]);

      assert.noFile([
        'api/blueprints/add.js',
        'api/blueprints/create.js',
        'api/blueprints/destroy.js',
        'api/blueprints/find.js',
        'api/blueprints/findone.js',
        'api/blueprints/populate.js',
        'api/blueprints/remove.js',
        'api/blueprints/update.js'
      ]);

      assert.fileContent('api/blueprints/custom.js', /res.ok\(\)/);
    });

    it('Should properly create test files', () => {
      assert.file([
        'test/unit/blueprints/custom.test.js'
      ]);

      assert.noFile([
        'test/unit/blueprints/add.test.js',
        'test/unit/blueprints/create.test.js',
        'test/unit/blueprints/destroy.test.js',
        'test/unit/blueprints/find.test.js',
        'test/unit/blueprints/findone.test.js',
        'test/unit/blueprints/populate.test.js',
        'test/unit/blueprints/remove.test.js',
        'test/unit/blueprints/update.test.js'
      ]);
    });
  });

  describe('Should properly scaffold all predefined blueprints at once', () => {
    before(() => {
      return test
        .run(path.join(__dirname, '../../generators/blueprint'))
        .withOptions({
          'all': true
        })
    });

    it('Should properly create api files', () => {
      assert.file([
        'api/blueprints/add.js',
        'api/blueprints/create.js',
        'api/blueprints/destroy.js',
        'api/blueprints/find.js',
        'api/blueprints/findone.js',
        'api/blueprints/populate.js',
        'api/blueprints/remove.js',
        'api/blueprints/update.js'
      ]);

      assert.noFile([
        'api/blueprints/custom.js'
      ]);

      assert.fileContent('api/blueprints/find.js', /const populateAlias = \(model, alias\) => model.populate\(alias\);/);
    });

    it('Should properly create test files', () => {
      assert.file([
        'test/unit/blueprints/add.test.js',
        'test/unit/blueprints/create.test.js',
        'test/unit/blueprints/destroy.test.js',
        'test/unit/blueprints/find.test.js',
        'test/unit/blueprints/findone.test.js',
        'test/unit/blueprints/populate.test.js',
        'test/unit/blueprints/remove.test.js',
        'test/unit/blueprints/update.test.js'
      ]);

      assert.noFile([
        'test/unit/blueprints/custom.test.js'
      ]);
    });
  });
});
