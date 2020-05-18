import { Filter } from '../src/Filter';
import { TestClass } from './utils';

describe('Test Filter', () => {
  it('should create an valid Filter instance', () => {
    const filter = new Filter({
      model: new TestClass('teste'),
      order: '+field'
    });
    const expected = {
      model: { field: 'teste' },
      query: { order: { field: 'ASC' } }
    };

    expect(filter).toEqual(expected);
  });
  it('should return the right TypeOrm Query for Mongo', () => {
    const filter = new Filter({
      model: new TestClass('teste', 'descript'),
      order: '+field'
    });
    const expectedQuery = {
      order: { field: 'ASC' },
      where: { '$or': [
        { field: 'teste' },
        { description: 'descript' }
      ]}
    };

    expect(filter.getTypeOrmMongoFilter()).toEqual(expectedQuery);
  });
});
