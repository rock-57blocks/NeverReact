import type { Config } from '@jest/types';

const esModules = ['@testing-library/preact', 'preact', '@preact/signals', 'fflate'].join('|');

const config: Config.InitialOptions = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'jsx'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  preset: 'ts-jest/presets/js-with-ts-esm',
  testRegex: '((src|embed/src)/.*(\\.|/)test)\\.tsx?$',
  setupFilesAfterEnv: ['<rootDir>/set-up-jest.ts'],
  verbose: true,
};

export default config;
