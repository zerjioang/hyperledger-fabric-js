import Bridge from './bridge.js';
import Logging from './logger.js';

// import hyperledger fabric specific protocol files
const fabric = require('./gen/vendor.js');

// add protobuffer
const protobuf = require('protobufjs');

/*
At this point, we are ready to create new protocol buffer objects
in our code using the methods automatically generated for us by the framework
*/

export {
  Bridge,
  Logging,
  fabric,
  protobuf
};
