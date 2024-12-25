import type { Config } from '@jest/types';

const esModules = ['@testing-library/preact', 'preact', '@preact/signals', 'fflate'].join('|');

const config: Config.InitialOptions = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'jsx'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    '^.+\\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/file-mock.ts',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  preset: 'ts-jest/presets/js-with-ts-esm',
  testRegex: '((src|embed/src)/.*(\\.|/)test)\\.tsx?$',
  setupFilesAfterEnv: ['<rootDir>/set-up-jest.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/index.tsx',
    '!src/main.tsx',
    'embed/src/**/*.{ts,tsx}',
    '!embed/src/config/**/*',
    '!embed/src/embed.tsx',
    '!embed/src/iframe.tsx',
  ],
  verbose: true,
};

export default config;
