/* global describe, it, before */

import chai from 'chai';
import {Bridge} from '../lib/hlf-bridge.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of the Hyperledger library', () => {
  before(() => {
    lib = new Bridge();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('Bridge');
    });
  });
});