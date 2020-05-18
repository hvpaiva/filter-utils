import { Order, OrderBuilder } from './Order';

/**
 * Assure that the informed number is an number and an Integer.
 * @param n The number to be normalid.
 */
function normalizeToInt(n: number) {
  return n ? parseInt(n.toString(), 10) : undefined;
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

  constructor(skip?: number, take?: number, order?: string) {
    this.skip = skip;
    this.take = take;
    this.order = order ? OrderBuilder<T>(order) : undefined;
  }
}
