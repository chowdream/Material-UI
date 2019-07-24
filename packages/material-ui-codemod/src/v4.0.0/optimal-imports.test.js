import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './optimal-imports';

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/, '') : '';
}

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString();
}

describe('@material-ui/codemod', () => {
  describe('v4.0.0', () => {
    describe('optimal-imports', () => {
      it('convert path as needed', () => {
        const actual = transform(
          { source: read('./optimal-imports.test/actual.js'), path: require.resolve('./optimal-imports.test/actual.js') },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./optimal-imports.test/expected.js');

        assert.strictEqual(
          trim(actual),
          trim(expected),
          'The transformed version should be correct',
        );
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./optimal-imports.test/expected.js'), path: require.resolve('./optimal-imports.test/expected.js') },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./optimal-imports.test/expected.js');

        assert.strictEqual(
          trim(actual),
          trim(expected),
          'The transformed version should be correct',
        );
      });
    });
  });
});
