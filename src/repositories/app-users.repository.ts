import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {AppUsers, AppUsersRelations, Roles} from '../models';
import {RolesRepository} from './roles.repository';
export type Credentials = {
  username: string;
  password: string;
  email: string;
};
export class AppUsersRepository extends DefaultCrudRepository<
  AppUsers,
  typeof AppUsers.prototype.id,
  AppUsersRelations
> {
  public readonly roles: BelongsToAccessor<Roles, typeof AppUsers.prototype.id>;
  credentials: any;

  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,
    @repository.getter('RolesRepository')
    protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(AppUsers, dataSource);
    this.roles = this.createBelongsToAccessorFor(
      'roles',
      rolesRepositoryGetter,
    );
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
