// Uncomment the code below and write your tests
import { join } from 'path';
import fs from 'fs';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';

jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(setInterval).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'mock/test.txt';
    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const wrongPathToFile = 'wrongPathToFile/test.txt';
    await readFileAsynchronously(wrongPathToFile);
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await expect(readFileAsynchronously(wrongPathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockContent = 'mock file content';
    const fullPath = 'someDir/file.txt';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockReturnValue(mockContent);
    (join as jest.Mock).mockReturnValue(fullPath);
    const result = await readFileAsynchronously('file.txt');

    expect(result).toBe(mockContent);
  });
});
