import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Keyandpassword extends Model {
  @property({
    type: 'string',
  })
  resetKey: string;

  @property({
    type: 'string',
  })
  password: string;

  @property({
    type: 'string',
  })
  confirmPassword: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Keyandpassword>) {
    super(data);
  }
}

export interface KeyandpasswordRelations {
  // describe navigational properties here
}

export type KeyandpasswordWithRelations = Keyandpassword &
  KeyandpasswordRelations;
