import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {ProductRelations, Products} from '../models';

export class ProductRepository extends DefaultCrudRepository<
  Products,
  typeof Products.prototype.id,
  ProductRelations
> {
  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,
  ) {
    super(Products, dataSource);
  }
}
