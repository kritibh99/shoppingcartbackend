import {belongsTo, Entity, model, property} from '@loopback/repository';
import {IAuthUser} from 'loopback4-authentication';
import {Roles} from './roles.model';

@model({name: 'app_users'})
export class AppUsers extends Entity implements IAuthUser {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    //required: true,
    jsonSchema: {
      minLength: 6,
      errorMessage: {
        minLength: 'INVALID PASSWORD LENGTH',
      },
    },
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
  })
  resetKey?: string;

  @property({
    type: 'string',
  })
  link?: string;

  @belongsTo(() => Roles, {name: 'roles'})
  rolesId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AppUsers>) {
    super(data);
  }
}

export interface AppUsersRelations {
  // describe navigational properties here
}

export type AppUsersWithRelations = AppUsers & AppUsersRelations;
