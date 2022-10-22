import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {Categories, SubCategoriesRelations, Sub_Categories} from '../models';
import {CategoriesRepository} from './categories.repository';

export class SubCategoriesRepository extends DefaultCrudRepository<
  Sub_Categories,
  typeof Sub_Categories.prototype.id,
  SubCategoriesRelations
> {
  public readonly categories: BelongsToAccessor<
    Categories,
    typeof Sub_Categories.prototype.id
  >;

  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,
    @repository.getter('CategoriesRepository')
    protected categoriesRepositoryGetter: Getter<CategoriesRepository>,
  ) {
    super(Sub_Categories, dataSource);
    this.categories = this.createBelongsToAccessorFor(
      'categories',
      categoriesRepositoryGetter,
    );
    this.registerInclusionResolver(
      'categories',
      this.categories.inclusionResolver,
    );
  }
}
