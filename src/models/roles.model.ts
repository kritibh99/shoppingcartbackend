import {Entity, hasMany, model, property} from '@loopback/repository';
import {Permissions} from 'loopback4-authorization';
import {AppUsers} from './app-users.model';

@model()
export class Roles extends Entity implements Permissions<string> {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  permissions: string[];

  @hasMany(() => AppUsers, {keyTo: 'roles'})
  appUsers: AppUsers[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
