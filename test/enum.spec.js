/* global describe, it, before */

import chai from 'chai';
import {Bridge, fabric} from '../lib/hlf-bridge.js';

chai.expect();

const expect = chai.expect;

let confidentiality;

describe('Fetching ENUM ConfidentialityLevel in js from .proto files', () => {
  before(() => {
  	console.log(fabric);
    confidentiality = fabric.protos.ConfidentialityLevel;
  });
  describe('when i want to read PUBLIC confidentiality value', () => {
    it('should return value 0', () => {
    	console.log(confidentiality);
      expect(confidentiality.PUBLIC).to.be.equal(0);
    });
    it('should return value 0', () => {
    	console.log(confidentiality);
      expect(confidentiality.CONFIDENTIAL).to.be.equal(1);
    });
  });
});