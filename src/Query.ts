import { Order, OrderBuilder } from './Order';

/**
 * Params to construct the Query object.
 * @since 1.0
 */
export type QueryParams = {
  /**
   * The number of skips the query will proceed in the list.
   * Ex.: The value 1 will ignore the first in list.
   * @since 1.0
   */
  skip?: number;
  /**
   * The number of results that the query will return.
   * Ex.: The value 10 will fetch the first 10 results.
   * @since 1.0
   */
  take?: number;
  /**
   * The Order in String form. Should be composed by the field to be sorted, plus
   * a prefix (+ or -) to asure the sort direction:
   * Ex.:
   * - 'createdAt' will sort in ascending direction by createdAt value.
   * - '+createdAt' will sort in ascending direction by createdAt value.
   * - '-createdAt' will sort in descending direction by createdAt value.
   * @since 1.0
   */
  order?: string;
}

/**
 * The Query values.
 * The Query is based on a Model, and it's instance can be created to make
 * the filter more powerful.
 * @since 1.0
 */
export class Query<T> {
  /**
   * The number of skips the query will proceed in the list.
   * Ex.: The value 1 will ignore the first in list.
   * @since 1.0
   */
  skip?: number;
  /**
   * The number of results that the query will return.
   * Ex.: The value 10 will fetch the first 10 results.
   * @since 1.0
   */
  take?: number;
  /**
   * The order of the Query. It's composed by a Model attribute and it's sort
   * direction.
   * @since 1.0
   */
  order?: Order<T>;

  constructor({skip, take, order}: QueryParams) {
    this.skip = skip ? normalizeInteger(skip) : undefined;
    this.take = take ? normalizeInteger(take) : undefined;
    this.order = order ? OrderBuilder<T>(order) : undefined;
  }
}

/**
 * This will assure that the number is positive and integer.
 * @param number The passed number
 * @since 1.0.1
 */
function normalizeInteger(number: number) {
  if (number < 0) throw new Error('The number should be integer');
  return parseInt(number.toString(), 10);
}
