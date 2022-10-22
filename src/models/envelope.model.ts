import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Envelope extends Model {
  @property({
    type: 'string',
  })
  from?: string;

  @property({
    type: 'string',
  })
  to?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Envelope>) {
    super(data);
  }
}

export interface EnvelopeRelations {
  // describe navigational properties here
}

export type EnvelopeWithRelations = Envelope & EnvelopeRelations;
