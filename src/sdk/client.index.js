/**
 * Copyright 2016 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * This is the main module for the "fabric-client" package. It provides the convenience
 * APIs to the classes of the package including [Channel]{@link module:api.Channel}
 */

// Using this module to host the couple of "typedef" sections used by api.js
// because jsdoc3 generator seems to not able to find them in the api.js module
// likely due to that module containing multiple classes

/**
 * Options for a key operation
 * @typedef {Object} KeyOpts
 * @property {boolean} ephemeral Whether the key should be persisted. "true" to persist.
 */
let api = require('./lib/client/api.js');
let BaseClient = require('./lib/client/BaseClient.js');
let BlockDecoder = require('./lib/client/BlockDecoder.js');
let CertificateAuthority = require('./lib/client/CertificateAuthority.js');
let ChannelEventHub = require('./lib/client/ChannelEventHub.js');
let Channel = require('./lib/client/Channel.js');
let Client = require('./lib/client/Client.js');
let Config = require('./lib/client/Config.js');
let Constants = require('./lib/client/Constants.js');
let EventHub = require('./lib/client/EventHub.js');
let hash = require('./lib/client/hash.js');
let Orderer = require('./lib/client/Orderer.js');
let Organization = require('./lib/client/Organization.js');
let Packager = require('./lib/client/Packager.js');
let Peer = require('./lib/client/Peer.js');
let Policy = require('./lib/client/Policy.js');
let Remote = require('./lib/client/Remote.js');
let TransactionID = require('./lib/client/TransactionID.js');
let User = require('./lib/client/User.js');
let utils = require('./lib/client/utils.js');

module.exports = {
	api,
	BaseClient,
	BlockDecoder,
	CertificateAuthority,
	ChannelEventHub,
	Channel,
	Client,
	Config,
	Constants,
	EventHub,
	hash,
	Orderer,
	Organization,
	Packager,
	Peer,
	Policy,
	Remote,
	TransactionID,
	User,
	utils
}
