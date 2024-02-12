// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: 'mocked one',
    mockTwo: 'mocked two',
    mockThree: 'mocked three',
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    expect(mockOne).toBe('mocked one');
    expect(mockTwo).toBe('mocked two');
    expect(mockThree).toBe('mocked three');
  });

  test('unmockedFunction should log into console', () => {
    expect(unmockedFunction()).toBeUndefined();
  });
});
