import { FindManyOptions } from 'typeorm';
import { Query } from "./Query";

/**
 * Params to construct the Filter object.
 */
export type FilterParams<T> = {
  /**
   * The object to be filtered.
   * You should pass an instance of the object with the fields to be filtered.
   * Ex.:
   * new Person({ name: 'John', status: 'active' });
   *
   * It'll filter all Persons with name 'John' and Status 'active'.
   */
  model: T;
  /**
   * The number of results skipped from the result list.
   * Ex.: The value 5 will skip and ignore the first 5 results.
   */
  offset?: number;
  /**
   * The number of results fetched.
   * Ex.: The value 10 will bring only 10 results of the list.
   */
  limit?: number;
  /**
   * The Order in String form. Should be composed by the field to be sorted, plus
   * a prefix (+ or -) to asure the sort direction:
   * Ex.:
   * - 'createdAt' will sort in ascending direction by createdAt value.
   * - '+createdAt' will sort in ascending direction by createdAt value.
   * - '-createdAt' will sort in descending direction by createdAt value.
   */
  order?: string;
}

/**
 * The Filter object.
 * You can create robust filter for GET commands.
 * All Filter instances have another Model as base, so you can filter by the
 * models attribute:
 * Ex.: Filter Person when name is 'John'.
 * You can also pass Query attributes to make the filter as you wish:
 *
 * Ex.: const personFilter = { name: "John" } as Person;
 * new Filter({
 *   model: personFilter,
 *   offset: 5,
 *   limit: 10,
 *   order: '+birthDate'
 * });
 *
 * This will create a filter that fetches all Persons that name is 'John', skipping
 * the first 5 results, and get only 10 results, sorting by birthDate in
 * ascending direction.
 */
export class Filter<T> {
  /**
   * The object to be filtered.
   * You should pass an instance of the object with the fields to be filtered.
   * Ex.:
   * new Person({ name: 'John', status: 'active' });
   *
   * It'll filter all Persons with name 'John' and Status 'active'.
   */
  model: T;
  /**
   * The Query object.
   * @see Query
   */
  query?: Query<T>;

  constructor({ model, offset, limit, order }: FilterParams<T>) {
    this.model = model;
    this.query = new Query({ skip: offset, take: limit, order });
  }

  /**
   * Gets the object to be used in TypeOrm + MongoDB find method:
   * Ex.:
   * this.personRepository.find({
   *    ...filter.getTypeOrmMongoFilter()
   * });
   *
   * It'll mount the object to be used in MongoRepository of the TypeOrm.
   * ATENTION: This method may not meet all use cases.
   */
  getTypeOrmMongoFilter(): FindManyOptions<T> | Partial<T> {
    const queriable = Object.keys(this.model)
      .map((k) => !!this.model[k])
      .reduce((acc, b) => acc || b);

    const query = () => {
      if (!queriable) return undefined;

      return {
        where: {
          $or: [
            ...Object.keys(this.model).map((k) => {
              return {
                [k]: this.model[k],
              };
            }),
          ],
        },
      };
    };

    return {
      ...this.query,
      ...query(),
    };
  }
}
