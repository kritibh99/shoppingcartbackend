import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Resetpasswordinit extends Model {
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Resetpasswordinit>) {
    super(data);
  }
}

export interface ResetpasswordinitRelations {
  // describe navigational properties here
}

export type ResetpasswordinitWithRelations = Resetpasswordinit & ResetpasswordinitRelations;
