"use strict";

/**
 * Step 5
 * Where you write the generator specific files (routes, controllers, etc)
 */

const fs = require('fs');

const SOURCE_CONTROLLER = `Controller.js`;
const SOURCE_CONTROLLER_TEST = `Controller.test.js`;
const SOURCE_MODEL = `Model.js`;
const SOURCE_MODEL_TEST = `Model.test.js`;
const SOURCE_MODEL_FIXTURE = `ModelFixture.js`;

const DESTINATION_CONTROLLER = name => `api/controllers/${name}Controller.js`;
const DESTINATION_CONTROLLER_TEST = name => `test/unit/controllers/${name}Controller.test.js`;
const DESTINATION_MODEL = name => `api/models/${name}.js`;
const DESTINATION_MODEL_TEST = name => `test/unit/models/${name}.test.js`;
const DESTINATION_MODEL_FIXTURE = name => `test/fixtures/${name}Fixture.js`;

module.exports = function () {
  const name = (this.options['model-name'].charAt(0).toUpperCase() + this.options['model-name'].slice(1)).replace(/Model/, '');
  const isREST = this.options['rest'];

  if (isREST && !fs.existsSync(this.destinationPath(DESTINATION_CONTROLLER(name)))) {
    this.fs.copyTpl(this.templatePath(SOURCE_CONTROLLER), this.destinationPath(DESTINATION_CONTROLLER(name)), {name});
    this.fs.copyTpl(this.templatePath(SOURCE_CONTROLLER_TEST), this.destinationPath(DESTINATION_CONTROLLER_TEST(name)), {name});
  }

  this.fs.copyTpl(this.templatePath(SOURCE_MODEL), this.destinationPath(DESTINATION_MODEL(name)), {name});
  this.fs.copyTpl(this.templatePath(SOURCE_MODEL_TEST), this.destinationPath(DESTINATION_MODEL_TEST(name)), {name});
  this.fs.copyTpl(this.templatePath(SOURCE_MODEL_FIXTURE), this.destinationPath(DESTINATION_MODEL_FIXTURE(name)), {name});
};
