// @flow weak
/* eslint-env mocha */

/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */

import { assert } from 'chai';
import * as MaterialUI from './index';

/* eslint-disable flowtype/require-valid-file-annotation */

describe('Material UI', () => {
  it('should have exports', () => assert.ok(MaterialUI));

  it('should not do undefined exports', () => {
    Object.keys(MaterialUI).forEach((exportKey) => assert.ok(MaterialUI[exportKey]));
  });
});
