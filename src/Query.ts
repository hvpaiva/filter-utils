import { Order, OrderBuilder } from './Order';

/**
 * Params to construct the Query object.
 */
export type QueryParams = {
  /**
   * The number of skips the query will proceed in the list.
   * Ex.: The value 1 will ignore the first in list.
   */
  skip?: number;
  /**
   * The number of results that the query will return.
   * Ex.: The value 10 will fetch the first 10 results.
   */
  take?: number;
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
 * The Query values.
 * The Query is based on a Model, and it's instance can be created to make
 * the filter more powerful.
 */
export class Query<T> {
  /**
   * The number of skips the query will proceed in the list.
   * Ex.: The value 1 will ignore the first in list.
   */
  skip?: number;
  /**
   * The number of results that the query will return.
   * Ex.: The value 10 will fetch the first 10 results.
   */
  take?: number;
  /**
   * The order of the Query. It's composed by a Model attribute and it's sort
   * direction.
   */
  order?: Order<T>;

  constructor({skip, take, order}: QueryParams) {
    this.skip = skip;
    this.take = take;
    this.order = order ? OrderBuilder<T>(order) : undefined;
  }
}
