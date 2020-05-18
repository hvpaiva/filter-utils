import { TestClass } from './utils';
import { OrderBuilder } from "../src/Order";

describe('Test Order', () => {
  it('should create an valid Order instance', () => {
    const orderDesc = OrderBuilder<TestClass>('-field');
    const orderAsc = OrderBuilder<TestClass>('+field');
    const order = OrderBuilder<TestClass>('field');

    const expectedResultDesc = { field: 'DESC' };
    const expectedResultAsc = { field: 'ASC' };

    expect(orderDesc).toStrictEqual(expectedResultDesc);
    expect(orderAsc).toStrictEqual(expectedResultAsc);
    expect(order).toStrictEqual(expectedResultAsc);
  });

  it('should return an undefined order when empty string provided', () => {
    const order = OrderBuilder<TestClass>("");

    expect(order).toBe(undefined);
  });
});
