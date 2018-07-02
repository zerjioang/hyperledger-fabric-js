import Bridge from './bridge.js';
import Logging from './logger.js';

// import hyperledger fabric specific protocol files
var fabric = require('./gen/vendor.js');

// add protobuffer
var protobuf = require('protobufjs');

/*
At this point, we are ready to create new protocol buffer objects
in our code using the methods automatically generated for us by the framework
*/

/*
import hyperledger ca client specific files
*/
var ca = require('./sdk/ca.index.js');

/*
import hyperledger ca client specific files
*/
var client = require('./sdk/client.index.js');

exports = {
  Bridge,
  Logging,
  fabric,
  protobuf,
  ca,
  client
};

module.exports = {
  Bridge,
  Logging,
  fabric,
  protobuf,
  ca,
  client
};
