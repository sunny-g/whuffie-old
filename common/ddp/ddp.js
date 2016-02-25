var DDPClient = require('ddp-client');

var DDP = function(params) {
  this.ddp = new DDPClient(params);
  this.collections = this.ddp.collections;
};

DDP.prototype.initialize = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    self.ddp.connect(function(error, wasReconnect) {
      // If autoReconnect is true, this back will be invoked each time
      // a server connection is re-established
      if (error) {
        console.log('DDP connection error!');
        reject(error);
      }

      if (wasReconnect) {
        console.log('Reestablishment of a connection.');
      }

      console.log('connected to Meteor server');
      resolve(true);
    });
  });
};

// Method to close the ddp connection
DDP.prototype.close = function() {
  return this.ddp.close();
};

// Promise-based subscription
DDP.prototype.subscribe = function(pubName, params) {
  var self = this;
  params = params || undefined;
  if (params && !Array.isArray(params)) {
    console.warn('Params must be passed as an array to DDP.subscribe');
  }
  return new Promise(function(resolve) {
    self.ddp.subscribe(pubName, params, function() {
      resolve(true);
    });
  })
};

// Promise-based method call
DDP.prototype.call = function(methodName, params) {
  var self = this;
  params = params || undefined;
  if (params && !Array.isArray(params)) {
    console.warn('Params must be passed as an array to ddp.call');
  }

  return new Promise(function(resolve, reject) {
    self.ddp.call(methodName, params,
      function (err, result) {
        // callback which returns the method call results
        // console.log('called function, result: ' + result);
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
      function () {
        // callback which fires when server has finished
        // console.log('updated');  // sending any updated documents as a result of
        // console.log(self.collections.posts);  // calling this method
      }
    );
  });
};

module.exports = DDP;