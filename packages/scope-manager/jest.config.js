'use strict';

// @ts-check

const baseConfig = require('../../jest.config.base.js');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: [
    ...baseConfig.setupFilesAfterEnv,
    './tests/test-utils/serializers/index.ts',
  ],
};
