var yeoman = require('yeoman-generator'),
    steps = require('./steps');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        // TODO: make debug option

        var args = require('./arguments'),
            options = require('./options');

        Object.keys(args).forEach(function (argName) {
            this.argument(argName, args[argName]);
        }.bind(this));

        Object.keys(options).forEach(function (optionName) {
            this.option(optionName, options[optionName]);
        }.bind(this));

        this.description = "Yeoman generator that provides already configured and optimized Sails REST API with bundle of predefined features";
        this.config.save();
    },

    initializing: steps.initializing,
    prompting: steps.prompting,
    configuring: steps.configuring,
    writing: steps.writing,
    conflicts: steps.conflicts,
    install: steps.install,
    end: steps.end
});
