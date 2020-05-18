import { FindManyOptions } from 'typeorm';
import { Query } from "./Query";

/**
 *
 */
export class Filter<T> {
  model: T;

  query?: Query<T>;

  constructor(model: T, offset?: number, limit?: number, order?: string) {
    this.model = model;
    this.query = new Query(offset, limit, order);
  }

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
