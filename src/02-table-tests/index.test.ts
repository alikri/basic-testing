// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 8, b: 2, action: Action.Subtract, expected: 6 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 18, b: 2, action: Action.Divide, expected: 9 },
  { a: 16, b: 2, action: Action.Divide, expected: 8 },
  { a: 14, b: 2, action: Action.Divide, expected: 7 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 6, b: 4, action: Action.Multiply, expected: 24 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 1, b: 2, action: '*^', expected: null },
  { a: 2, b: 3, action: '--', expected: null },
  { a: 3, b: 4, action: '++', expected: null },
  { a: 5, b: '6', action: Action.Add, expected: null },
  { a: true, b: 7, action: Action.Add, expected: null },
  { a: undefined, b: 8, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'given %p and %p with action %p, returns %p',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
