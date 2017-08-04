/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

import { expect } from 'chai';
import { consola } from './utils';

describe('Utils', () => {
  describe('consola', () => {
    it('should be an object', () => {
      expect(consola).to.be.an('object');
    });

    it('should be same as console', () => {
      expect(consola).to.equal(console);
    });

    it('output should be same as console.log', () => {
      const consoleOutput = console.log('hello world');
      const consolaOutput = consola.log('hello world');

      expect(consolaOutput).to.equal(consoleOutput);
    });

    it('output should be same as console.warn', () => {
      const consoleOutput = console.warn('hello world');
      const consolaOutput = consola.warn('hello world');

      expect(consolaOutput).to.equal(consoleOutput);
    });
  });
});
