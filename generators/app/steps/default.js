"use strict";

/**
 * Step 4
 * Default priority in run loop
 */

module.exports = function () {
  if (this.answers['authentication:enabled']) {
    this.composeWith('sails-rest-api:authentication', {
      arguments: [],
      options: {
        'secret-key': this.answers['authentication:secret-key']
      }
    });
  }

  if (this.answers['blueprint:all']) {
    this.composeWith('sails-rest-api:blueprint', {
      arguments: [],
      options: {
        'all': true
      }
    });
  }

  this.composeWith('sails-rest-api:config', {
    arguments: [],
    options: {
      'database-adapter': this.answers['config:database-adapter'],
      'database-host': this.answers['config:database-host'],
      'database-name': this.answers['config:database-name'],
      'database-username': this.answers['config:database-username'],
      'database-password': this.answers['config:database-password'],
      'dynamo-access-key-id': this.answers['config:dynamo-access-key-id'],
      'dynamo-secret-access-key': this.answers['config:dynamo-secret-access-key'],
      'dynamo-region': this.answers['config:dynamo-region'],
      'cors': this.answers['config:cors']
    }
  });

  this.answers['controller:chosen'].forEach(controller => {
    this.composeWith('sails-rest-api:controller', {
      arguments: [controller],
      options: {}
    });
  });

  if (this.answers['cron:enabled']) {
    this.composeWith('sails-rest-api:cron', {
      arguments: [],
      options: {}
    });
  }

  this.answers['hook:chosen'].forEach(hook => {
    this.composeWith('sails-rest-api:hook', {
      arguments: [hook],
      options: {}
    });
  });

  this.composeWith('sails-rest-api:logger', {
    arguments: [this.answers['logger:chosen']],
    options: {}
  });

  this.composeWith('sails-rest-api:response', {
    arguments: [],
    options: {
      'all': true
    }
  });

  this.answers['service:chosen'].forEach(service => {
    this.composeWith('sails-rest-api:service', {
      arguments: [service],
      options: {
        'cipher-secret-key': this.answers['authentication:secret-key'],
        'image-provider': this.answers['service:image-provider'],
        'location-provider': this.answers['service:location-provider'],
        'mailer-provider': this.answers['service:mailer-provider'],
        'payment-provider': this.answers['service:payment-provider'],
        'sms-provider': this.answers['service:sms-provider'],
        'storage-provider': this.answers['service:storage-provider']
      }
    });
  });

  if (this.answers['swagger:enabled']) {
    this.composeWith('sails-rest-api:swagger', {
      arguments: [],
      options: {}
    });
  }
};
