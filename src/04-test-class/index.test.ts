// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  // SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  let myBankAccount: BankAccount;
  let strangerAccount: BankAccount;
  let myBalance: number;

  beforeAll(() => {
    myBankAccount = getBankAccount(100);
    strangerAccount = getBankAccount(100);
  });

  beforeEach(() => {
    myBalance = myBankAccount.getBalance();
  });

  test('should create account with initial balance', () => {
    expect(myBankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    if (1000 > myBalance) {
      expect(() => myBankAccount.withdraw(1000)).toThrow(
        InsufficientFundsError,
      );
    }
  });

  test('should throw error when transferring more than balance', () => {
    if (1000 > myBalance) {
      expect(() => myBankAccount.transfer(1000, strangerAccount)).toThrow();
    }
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => myBankAccount.transfer(100, myBankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    myBankAccount.deposit(2000);
    myBalance += 2000;
    expect(myBankAccount.getBalance()).toBe(myBalance);
  });

  test('should withdraw money', () => {
    myBankAccount.withdraw(50);
    myBalance -= 50;
    expect(myBankAccount.getBalance()).toBe(myBalance);
  });

  test('should transfer money', () => {
    myBankAccount.transfer(50, strangerAccount);
    myBalance -= 50;
    expect(myBankAccount.getBalance()).toBe(myBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
