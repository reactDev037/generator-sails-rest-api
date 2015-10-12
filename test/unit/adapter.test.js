import path from 'path';
import os from 'os';
import { assert, test } from 'yeoman-generator';

describe('sails-rest-api:adapter', () => {
  describe('Should properly scaffold adapter', () => {
    before(done => {
      test
        .run(path.join(__dirname, '../../src/adapter'))
        .withArguments(['mongo'])
        .on('end', done)
    });

    it('Should properly create api files', () => {
      assert.file([
        'api/adapters/MongoAdapter.js'
      ]);
    });

    it('Should properly create test files', () => {
      assert.file([
        'test/unit/adapters/MongoAdapter.test.js'
      ]);
    });
  });
});
