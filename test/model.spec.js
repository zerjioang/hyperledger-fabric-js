/* global describe, it, before */

import chai from 'chai';
import {Bridge, fabric} from '../lib/hlf.min.js';

chai.expect();

const expect = chai.expect;

let chaincodeID;

describe('Fetching MODEL ChaincodeID in js from .proto files', () => {
  before(() => {
    chaincodeID = fabric.protos.ChaincodeID.create();
  });
  describe('when i want to create a chaincodeID model object', () => {
    it('should return a not null value', () => {
    	console.log(chaincodeID);
      expect(chaincodeID!=null && chaincodeID!=undefined).to.be.true;
    });
  });
});