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

/*
import hyperledger ca client specific files
*/
require('./sdk/ca.index.js');
/*
import hyperledger ca client specific files
*/

require('./sdk/client.index.js');

export {
  Bridge,
  Logging,
  fabric,
  protobuf
};
