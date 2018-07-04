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

'use strict';

import kvconf from 'store';
var path  = require('path');

const default_ca_config = { 
	"request-timeout" : 3000,
	"tcert-batch-size" : 10,
	"crypto-hash-algo": "SHA2",
	"crypto-keysize": 256,
	"crypto-hsm": false,
	"crypto-suite-software": {
		"EC": "fabric-ca-client/lib/impl/CryptoSuite_ECDSA_AES.js"
	},
	"crypto-suite-hsm": {
		"EC": "fabric-ca-client/lib/impl/bccsp_pkcs11.js"
	},
	"key-value-store": "fabric-ca-client/lib/impl/FileKeyValueStore.js"
};

const default_client_config = {
	"request-timeout" : 45000,
	"crypto-hash-algo": "SHA2",
	"crypto-keysize": 256,
	"crypto-hsm": false,
	"crypto-suite-software": {
		"EC": "fabric-client/lib/impl/CryptoSuite_ECDSA_AES.js"
	},
	"crypto-suite-hsm": {
		"EC": "fabric-client/lib/impl/bccsp_pkcs11.js"
	},
	"key-value-store": "fabric-client/lib/impl/FileKeyValueStore.js",
	"certificate-authority-client": "fabric-ca-client",
	"nonce-size" : 24,
	"grpc-ssl-cipher-suites": "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384",
	"grpc.max_receive_message_length": -1,
	"grpc.max_send_message_length": -1,
	"network-config-schema" : {
		"1.0": "./impl/NetworkConfig_1_0.js"
	}
};

const default_ca_config_path = "/config/default_ca.json";
const default_client_config_path = "/config/default_client.json";


//
// The class representing the hierarchy of configuration settings.
//
var Config = class {

	constructor() {
		this._fileStores = [];
		// reference to configuration settings
		this._config = kvconf;
		console.log("Setting default key-value-store as localstore using store.js");
		this.set('key-value-store', 'store');
	}

	//
	//	 utility method to reload the file based stores so
	//	 the last one added is on the top of the files hierarchy
	//	 unless the bottom flag indicates to add otherwise
	//
	reorderFileStores(path, bottom) {
		console.log("Reordering files stores...");
		if (this._config == null  || this._config.undefined) {
			this._fileStores = [];
			this._config = kvconf;
		}

		// first remove all the file stores
		for(var x in this._fileStores) {
			console.log("Removing files store...");
			this._config.remove(this._fileStores[x]);
		}

		if(bottom) {
			// add to the bottom of the list
			this._fileStores.push(path);
		} else {
			// add this new file to the front of the list
			this._fileStores.unshift(path);
		}

		// now load all the file stores
		console.log("Reloading file stores...");
		for(var x in this._fileStores) {
			var name = this._fileStores[x];
			console.log("Saving name file store as: "+name);
			//apply configuration hooks
			if (name == default_ca_config_path) {
				this.set(name, default_ca_config);
				for (var key in default_ca_config) {
				    if (default_ca_config.hasOwnProperty(key)) {
				        this.set(key, default_ca_config[key]);
				    }
				}
			} else if (name == default_client_config_path) {
				this.set(name, default_client_config);
				for (var key in default_client_config) {
				    if (default_client_config.hasOwnProperty(key)) {
				        this.set(key, default_client_config[key]);
				    }
				}
			} else {
				//do not hook
				this.set(name, name);
			}
		}
	}

	//
	//    Add an additional file
	//
	file(path) {
		if(typeof path !== 'string') {
			throw new Error('The "path" parameter must be a string');
		}
		// just reuse the path name as the store name...will be unique
		this.reorderFileStores(path);
	}

	/*
	Wrapper functions for store library
	*/
	set(key, value) {
		//original function from sdk: nconf.set(key, value)
		console.log("Saving KV: ["+key+", "+value+"]")
		kvconf.set(key, value)
	}

	get(key, fallback) {
		let result = kvconf.get(key);
		if(result !=null && result != undefined){
			fallback = result;
		}
		return fallback;
	}

	delete(key) {
		kvconf.remove(key)
	}

	reset(key) {
		kvconf.clearAll()
	}

};

module.exports = Config;
