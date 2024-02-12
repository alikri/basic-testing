// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: { value: null, next: null },
        },
      },
    };

    const linkedList = generateLinkedList(values);
    expect(linkedList).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const values = ['1', '2', '3'];
    const linkedList = generateLinkedList(values);
    expect(linkedList).toMatchSnapshot();
  });
});
