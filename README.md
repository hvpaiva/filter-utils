# Filter Utils

[![Build Status](https://github.com/hvpaiva/filter-utils/workflows/Release/badge.svg)](https://github.com/hvpaiva/filter-utils/actions?query=workflow%3ARelease)
[![Coverage Status](https://coveralls.io/repos/github/hvpaiva/filter-utils/badge.svg?branch=master)](https://coveralls.io/github/hvpaiva/filter-utils?branch=master)
[![licence](https://img.shields.io/npm/l/filter-utils)](https://github.com/hvpaiva/filter-utils/blob/master/LICENCE)

The main goal of this lib is provide an easy way to create filters fot GET methods.

## Requirements
This project was made with **node:lts/erbium**.

## Install

This module is published under NPM registry, so you can install using any Node.js package manager.

```sh
npm install filter-utils --save

# For Yarn use the command below.
yarn add filter-utils
```

## Usage

The `filter-utils` provides ways to create Filter objects, for exemple:

```js
const filter = new Filter<Person>({
  limit: 10,
  offset: 0,
  order: '+createdAt'
});
```

This will create a filter object that when passed to Repository will fetch a list with a limit of 10 results, without skipping any value and sort by 'createdAt' attribute in ascending direction.

### Filter Attributes

| Attribute  | Type             | Description |
|------------|------------------|-------------|
| limit      | Positive Integer | The number of values fetched by the query. Ex.: The number 10 will bring the first 10 values. |
| offset     | Positive Integer | The number of values skipped in the query. Ex.: The value 5, will ignore the first 5 values. |
| order      | String           | The order String. Composed by the prefix (+ or -) an the attribute. |
| model      | Class Instance   | The Object with values to be filtered. |

### Filter Model

As you always filter some kind of entity, you can create an instance of that entity to help to filter by some value:

```js
const person = new Person({ name: 'John' });

const filter = new Filter<Person>({
  model: person
});
```
This will create a filter object that will fetch all Persons named 'John'.

> It's not required to pass the Person in Filter generics (`new Filter<Person>()`), but is useful for type checking.

### Order rules

To create an order, you'll need to pass an prefix (+ or -) and some attribute of the filtered Model.

- **Plus (+):** The prefix + will sort in *ascending* direction.
- **Minus (-):** The prefix - will sort in *descending* direction.
- **No prefix:** Not passing the prefix will sort in *ascending* direction.

```js
const filter = new Filter<Person>({
  order: '-name'
});
```

It'll filter sorting by name in descending direction.

### Using the filter object

After constructing the Filter object. You can use it with the responsible to fetch the data. 

In this lib, we only created this for MongoRepository of the TypeOrm:

```js
import { Filter } from 'filter-utils';
import { MongoRepository } from 'typeorm';

const filter = new Filter<Person>({ order: 'createdAt' });

const persons = new MongoRepository<Person>().find({
  ...filter.getTypeOrmMongoFilter()
});

```

Using with `MongoRepository` of the [TypeORM](https://typeorm.io/#/) lib, it will format the filter object that way the repository needed.

### Other objects

You can also use other objects to create your specific use case:

- Order and OrderBulder

This will create by the string order an Order Type, which is a object with the attribute and it's order direction (ASC or DESC).

```js
import { OrderBuilder } from 'filter-utils';

const nameOrder = OrderBuilder<Person>('-name');
// { name: 'DESC' } -> Order instance

const createdAtOrder = OrderBuilder<Person>('+createdAt');
// { createdAt: 'ASC' } -> Order instance
```

- Query

The Query object is used in Filter to compose the most common query attributes:
`take` works as Filter's limit, `skip` works as Filter's offset and `order` is the same.

The order is passed in String format, but in Query instance it'll be converted to Order type.

```js
import { Query } from 'filter-utils';

const query = new Query<Person>({
  take: 10,
  skip: 10,
  order: '+createdAt'
});
// {
//   take: 10,
//   skip: 10,
//   order: { createdAt: 'ASC' }
// } -> Query instance

```

## Author
- Created by [Highlander Paiva](https://github.com/hvpaiva)

## Contributing
Bug reports and pull requests are welcome on GitHub

## License
The project is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
