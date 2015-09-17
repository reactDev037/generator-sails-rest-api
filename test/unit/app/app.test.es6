import path from 'path';
import os from 'os';
import { assert, test } from 'yeoman-generator';

describe('sails-rest-api:app', () => {
  before(done => {
    test
      .run(path.join(__dirname, '../../../generators/app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({
        "skip-all": true,
        "verbose": true
      })
      .on('end', done);
  });

  it('Should properly create root files', () => {
    assert.file([
      '.editorconfig',
      '.gitignore',
      '.sailsrc',
      'app.js',
      'package.json'
    ]);
  });
});
