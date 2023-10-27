import type { Config } from 'jest';

const config: Config = {
  preset: '@moneko/solid',
  coveragePathIgnorePatterns: ['prism.js', 'code', 'md'],
  testPathIgnorePatterns: ['prism.js', 'code', 'md'],
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.ts',
    '<rootDir>/test/canvas.ts',
    '<rootDir>/test/event.ts',
    '<rootDir>/test/structured-clone.ts',
    '<rootDir>/components/index.ts',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/file.mock.ts',
    '\\.(css|less)$': '<rootDir>/test/obj-proxy.ts',
    '\\?raw$': '<rootDir>/test/file.mock.ts',
    '\\?url$': '<rootDir>/test/file.mock.ts',
  },
};

export default config;
