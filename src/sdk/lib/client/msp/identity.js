/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/
'use strict';

const protogen = require('../../../../gen/vendor.js');
var identityProto = protogen.msp;

/**
 * This interface is shared within the peer and client API of the membership service provider.
 * Identity interface defines operations associated to a "certificate".
 * That is, the public part of the identity could be thought to be a certificate,
 * and offers solely signature verification capabilities. This is to be used
 * at the client side when validating certificates that endorsements are signed
 * with, and verifying signatures that correspond to these certificates.
 *
 * @class
 */
var Identity = class {
	/**
	 * @param {string} certificate HEX string for the PEM encoded certificate
	 * @param {module:api.Key} publicKey The public key represented by the certificate
	 * @param {string} mspId The associated MSP's mspId that manages this identity
	 * @param {module:api.CryptoSuite} cryptoSuite The underlying {@link CryptoSuite} implementation for the digital
	 * signature algorithm
	 */
	constructor(certificate, publicKey, mspId, cryptoSuite) {

		if (!certificate)
			throw new Error('Missing required parameter "certificate".');

		if (!publicKey)
			throw new Error('Missing required parameter "publicKey".');

		if (!mspId)
			throw new Error('Missing required parameter "mspId".');

		if (!cryptoSuite)
			throw new Error('Missing required parameter "cryptoSuite".');

		this._certificate = certificate;
		this._publicKey = publicKey;
		this._mspId = mspId;
		this._cryptoSuite = cryptoSuite;
	}

	/**
	 * Returns the identifier of the Membser Service Provider that manages
	 * this identity in terms of being able to understand the key algorithms
	 * and have access to the trusted roots needed to validate it
	 * @returns {string}
	 */
	getMSPId() {
		return this._mspId;
	}

	/**
	 * This uses the rules that govern this identity to validate it.
	 * E.g., if it is a fabric TCert implemented as identity, validate
	 * will check the TCert signature against the assumed root certificate
	 * authority.
	 * @returns {boolean}
	 */
	isValid() {
		return true;
	}

	/**
	 * Returns the organization units this identity is related to
	 * as long as this is public information. In certain implementations
	 * this could be implemented by certain attributes that are publicly
	 * associated to that identity, or the identifier of the root certificate
	 * authority that has provided signatures on this certificate.
	 * Examples:
	 *  - OrganizationUnit of a fabric-tcert that was signed by TCA under name
	 *    "Organization 1", would be "Organization 1".
	 *  - OrganizationUnit of an alternative implementation of tcert signed by a public
	 *    CA used by organization "Organization 1", could be provided in the clear
	 *    as part of that tcert structure that this call would be able to return.
	 * @returns {string}
	 */
	getOrganizationUnits() {
		return 'dunno!';
	}

	/**
	 * Verify a signature over some message using this identity as reference
	 * @param {byte[]} msg The message to be verified
	 * @param {byte[]} signature The signature generated against the message "msg"
	 * @param {Object} opts Options include 'policy' and 'label'
	 */
	verify(msg, signature, opts) {
		return this._cryptoSuite.verify(this._publicKey, signature, msg);
	}

	/**
	 * Verify attributes against the given attribute spec
	 * TODO: when this method's design is finalized
	 */
	verifyAttributes(proof, attributeProofSpec) {
		return true;
	}

	/**
	 * Converts this identity to bytes
	 * @returns {Buffer} protobuf-based serialization with two fields: "mspid" and "certificate PEM bytes"
	 */
	serialize() {
		var serializedIdentity = new identityProto.SerializedIdentity();
		serializedIdentity.setMspid(this.getMSPId());
		serializedIdentity.setIdBytes(Buffer.from(this._certificate));
		return serializedIdentity.toBuffer();
	}
};

/**
 * Signer is an interface for an opaque private key that can be used for signing operations
 *
 * @class
 */
var Signer = class {
	/**
	 * @param {module:api.CryptoSuite} cryptoSuite The underlying {@link CryptoSuite} implementation for the digital
	 * signature algorithm
	 * @param {module:api.Key} key The private key
	 */
	constructor(cryptoSuite, key) {
		if (!cryptoSuite)
			throw new Error('Missing required parameter "cryptoSuite"');

		if (!key)
			throw new Error('Missing required parameter "key" for private key');

		this._cryptoSuite = cryptoSuite;
		this._key = key;
	}

	/**
	 * Returns the public key corresponding to the opaque, private key
	 *
	 * @returns {module:api.Key} The public key corresponding to the private key
	 */
	getPublicKey() {
		return this._key.getPublicKey();
	}

	/**
	 * Signs digest with the private key.
     *
     * Hash implements the SignerOpts interface and, in most cases, one can
     * simply pass in the hash function used as opts. Sign may also attempt
     * to type assert opts to other types in order to obtain algorithm
     * specific values.
     *
     * Note that when a signature of a hash of a larger message is needed,
     * the caller is responsible for hashing the larger message and passing
     * the hash (as digest) and the hash function (as opts) to Sign.
	 *
	 * @param {byte[]} digest The message to sign
	 * @param {Object} opts
	 *      hashingFunction: the function to use to hash
	 */
	sign(digest, opts) {
		return this._cryptoSuite.sign(this._key, digest, opts);
	}
};

/**
 * SigningIdentity is an extension of Identity to cover signing capabilities. E.g., signing identity
 * should be requested in the case of a client who wishes to sign proposal responses and transactions
 *
 * @class
 */
var SigningIdentity = class extends Identity {
	/**
	 * @param {string} certificate HEX string for the PEM encoded certificate
	 * @param {module:api.Key} publicKey The public key represented by the certificate
	 * @param {string} mspId The associated MSP's ID that manages this identity
	 * @param {module:api.CryptoSuite} cryptoSuite The underlying {@link CryptoSuite} implementation for the digital
	 * signature algorithm
	 * @param {Signer} signer The signer object encapsulating the opaque private key and the corresponding
	 * digital signature algorithm to be used for signing operations
	 */
	constructor(certificate, publicKey, mspId, cryptoSuite, signer) {
		super(certificate, publicKey, mspId, cryptoSuite);

		if (!signer)
			throw new Error('Missing required parameter "signer".');

		this._signer = signer;
	}

	/**
	 * Signs digest with the private key contained inside the signer.
	 *
	 * @param {byte[]} msg The message to sign
	 * @param {Object} opts Options object for the signing, contains one field 'hashFunction' that allows
	 *   different hashing algorithms to be used. If not present, will default to the hash function
	 *   configured for the identity's own crypto suite object
	 */
	sign(msg, opts) {
		// calculate the hash for the message before signing
		var hashFunction;
		if (opts && opts.hashFunction) {
			if (typeof opts.hashFunction !== 'function') {
				throw new Error('The "hashFunction" field must be a function');
			}

			hashFunction = opts.hashFunction;
		} else {
			hashFunction = this._cryptoSuite.hash.bind(this._cryptoSuite);
		}

		var digest = hashFunction(msg);
		return this._signer.sign(Buffer.from(digest, 'hex'), null);
	}

	static isInstance(object) {
		return object._certificate &&
			object._publicKey &&
			object._mspId &&
			object._cryptoSuite &&
			object._signer;
	}
};

module.exports.Identity = Identity;
module.exports.SigningIdentity = SigningIdentity;
module.exports.Signer = Signer;
