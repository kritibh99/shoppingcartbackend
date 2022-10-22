import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {AppUsers, Roles, RolesRelations} from '../models';
import {AppUsersRepository} from './app-users.repository';
export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
> {
  public readonly appUsers: HasManyRepositoryFactory<
    AppUsers,
    typeof Roles.prototype.id
  >;

  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,

    @repository.getter('AppUsersRepository')
    protected AppUsersRepositoryGetter: Getter<AppUsersRepository>,
  ) {
    super(Roles, dataSource);

    //console.log('@@@@@@@@@@@@@@@@');

    this.appUsers = this.createHasManyRepositoryFactoryFor(
      'appUsers',
      AppUsersRepositoryGetter,
    );

    this.registerInclusionResolver('appUsers', this.appUsers.inclusionResolver);
  }
}
