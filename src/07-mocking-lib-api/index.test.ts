// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn().mockResolvedValue({ data: 'mockData' }),
  })),
}));

jest.mock('lodash/throttle', () => ({
  default: jest.fn((fn) => fn),
  __esModule: true,
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: 'mockData' }),
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
