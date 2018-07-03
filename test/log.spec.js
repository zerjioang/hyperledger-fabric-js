/* global describe, it, before */

import chai from 'chai';
import {Log} from '../lib/hlf.js';

chai.expect();

const expect = chai.expect;

let logger;

describe('Given an instance of the Hyperledger library Logger', () => {
  before(() => {
    logger = new Log();
    console.log(logger);
  });
  describe('when I need a logging object', () => {
    it('should return it', () => {
      expect(logger!=null && logger!=undefined).to.be.true;
    });
  });
  describe('when I need the logger name', () => {
    it('should return the name', () => {
      expect(logger.name).to.be.equal('HLFLog');
    });
  });
  describe('when I need the logging level', () => {
    it('should return the appropiate level', () => {
      expect(logger.getLevel!=undefined).to.be.true;
    });
  });

});