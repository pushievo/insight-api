'use strict';

var Common = require('./common');

function GovObjectController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
}

GovObjectController.prototype.list = function(req, res) {
  var options = {
    type:1//by default display proposal
  };
  if (req.params.filter) {
      if (req.params.filter == 'proposal') options.type = 1;
      if (req.params.filter == 'trigger') options.type = 2;
  }

  this.govObjectList(options, function(err, result) {
    if (err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(result);
  });

};

GovObjectController.prototype.govObjectList = function(options, callback) {
    this.node.services.bitcoind.govObjectList(options, function(err, result) {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });

};


GovObjectController.prototype.show = function(req, res) {
    var self = this;
    var options = {};

    this.getHash(req.hash, function(err, data) {
        if(err) {
            return self.common.handleErrors(err, res);
        }

        res.jsonp(data);
    });

};

GovObjectController.prototype.getHash = function(hash, callback) {

    this.node.services.bitcoind.govObjectHash(hash, function(err, result) {
        if (err) {
            return callback(err);
        }

        callback(null, result);
    });

};

/**
 * Verifies that the GovObject Hash provided is valid.
 *
 * @param req
 * @param res
 * @param next
 */
GovObjectController.prototype.validateHash = function(req, res, next) {
    req.hash = req.params.hash;
    this.isValidHash(req, res, next, [req.hash]);
};

GovObjectController.prototype.isValidHash = function(req, res, next, hash) {
    // TODO: Implement some type of validation
    if(hash) next();
};


GovObjectController.prototype.govObjectCheck = function(req, res) {
  var self = this;
  var hexdata = req.params.hexdata;

  this.node.services.bitcoind.govObjectCheck(hexdata, function(err, result) {
    if (err) {
      return self.common.handleErrors(err, res);
    }
    res.jsonp(result);
  });
};

GovObjectController.prototype.getInfo = function (req, res) {
  var self = this;
  this.node.services.bitcoind.govObjectInfo(function (err, result) {
    if(err) { return self.common.handleErrors(err, res);}
    res.jsonp(result);
  })
}
GovObjectController.prototype.getCount = function (req, res) {
  var self = this;
  this.node.services.bitcoind.govCount(function (err, result) {
    if(err) { return self.common.handleErrors(err, res);}
    res.jsonp(result);
  })
}
GovObjectController.prototype.govObjectDeserialize = function (req, res) {
  var self = this;
  var hexdata = req.params.hexdata;

  this.node.services.bitcoind.govObjectDeserialize(hexdata, function (err, result) {
    if(err) { return self.common.handleErrors(err, res);}
    res.jsonp(result);
  })
}
module.exports = GovObjectController;
