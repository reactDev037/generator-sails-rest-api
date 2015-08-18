var _ = require('lodash');
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var Promise = require('bluebird');

module.exports = {
  index: function (req, res) {
    var models = [];
    var whereObj = {};
    if (!req.param('q')) {
      return res.badRequest(null, null, 'You should specify a "q" parameter!');
    }
    var q = req.param('q');
    if (req.param('model')) {
      var modelStr = req.param('model').toString().toLowerCase();
      if (!(modelStr in sails.models)) {
        return res.badRequest(null, null, 'Cannot find model: ' + modelStr);
      }
      _.set(req.options, 'criteria.blacklist', ['model', 'q']);
      whereObj = actionUtil.parseCriteria(req);
      models.push({name: modelStr, model: sails.models[modelStr]});
    }
    else {
      _.forEach(sails.models, function (model, modelStr) {
        models.push({name: modelStr, model: model});
      });
    }
    var promisies = models.map(function (modelObj) {
      var model = modelObj.model;
      var modelStr = modelObj.name;
      var where = _.merge(genWhereCriteria(model, q), whereObj);
      return model
        .find(where)
        .then(function (queryRes) {
          var resObj = {};
          resObj[modelStr] = queryRes;
          return Promise.resolve(resObj)
        })
    });
    Promise
      .all(promisies)
      .then(function (searchRes) {
        return _.transform(searchRes, function (result, val) {
          result = _.merge(result, val);
        }, {});
      })
      .then(res.ok)
      .catch(res.serverError.bind(this, null, null));
  }
};

function genWhereCriteria(Model, q) {
  var orObj = [];
  _.forEach(Model.definition, function (attr, name) {
    var obj = {};
    obj[name] = {contains: q};
    orObj.push(obj);
  });
  return {or: orObj};
}
