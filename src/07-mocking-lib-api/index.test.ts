import axios from 'axios';
import { throttledGetDataFromApi } from './index';

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
