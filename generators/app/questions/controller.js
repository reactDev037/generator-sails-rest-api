"use strict";

/**
 * Exports array that contains questions for prompting.
 * The array with questions is an array of Inquirer prompt objects - https://github.com/SBoudrias/Inquirer.js#prompts-type
 *
 * @example
 * module.exports = [{
 *   type: 'input',
 *   name: 'inputName',
 *   message: 'Message for the input'
 * }];
 */

module.exports = [{
  type: 'checkbox',
  name: 'controller:chosen',
  message: 'Choose which predefined controllers you want to copy',
  default: ['PingController', 'SearchController'],
  choices: [
    'PingController',
    'SearchController'
  ]
}];
