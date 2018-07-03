/* global describe, it, before */

import chai from 'chai';
import {Bridge} from '../lib/hlf.js';

chai.expect();

const expect = chai.expect;

let b;

describe('Given an instance of the Hyperledger library', () => {
  before(() => {
    b = new Bridge();
    console.log(b);
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(b.name).to.be.equal('Bridge');
    });
  });
});