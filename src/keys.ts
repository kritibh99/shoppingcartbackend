// import {Credentials} from './repositories/app-users.repository';

import {UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
import {AppUsers} from './models/app-users.model';
import {Credentials} from './repositories';
import {passwordHasher} from './services';
export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER =
    BindingKey.create<passwordHasher>('services.hasher');
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}
export namespace AuthServiceBindings {
  export const Auth_SERVICE = BindingKey.create<
    UserService<AppUsers, Credentials>
  >('service.auth.service');
}
