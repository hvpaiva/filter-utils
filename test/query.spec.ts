import { Query } from './../src/Query';
import { TestClass } from './utils';

describe('Test Query', () => {
  it('should create an valid Query instance', () => {
    const scenario1 = new Query<TestClass>(1, 0, 'field');
    const expected1 = { skip: 1, take: 0, order: { field: 'ASC' }};

    const scenario2 = new Query<TestClass>(0, 0, 'field');
    const expected2 = { skip: 0, take: 0, order: { field: 'ASC' }} as Query<TestClass>;

    const scenario3 = new Query<TestClass>();
    const expected3 = { };

    const scenario4 = new Query<TestClass>(undefined, undefined, '-field');
    const expected4 = { order: { field: 'DESC' }};

    expect(scenario1).toEqual(expected1);
    expect(scenario2).toEqual(expected2);
    expect(scenario3).toEqual(expected3);
    expect(scenario4).toEqual(expected4);
  });
});
