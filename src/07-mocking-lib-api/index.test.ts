import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn().mockResolvedValue({ data: 'mockData' }),
  })),
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: 'mockData' }),
    });
  });

  test('should create instance with provided base url', async () => {
    jest.advanceTimersByTime(THROTTLE_TIME);
    await throttledGetDataFromApi('/news');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/news';
    await throttledGetDataFromApi(relativePath);
    expect(axios.create().get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/news';
    const data = await throttledGetDataFromApi(relativePath);
    expect(data).toEqual('mockData');
  });
});
