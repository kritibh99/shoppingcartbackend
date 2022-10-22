import {Model, model, property} from '@loopback/repository';
import {Envelope} from './envelope.model';

@model({settings: {strict: false}})
export class Nodemailer extends Model {
  @property({
    type: 'array',
    itemType: 'string',
  })
  accepted: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  rejected: string[];

  @property({
    type: 'number',
  })
  envelopeTime: number;

  @property({
    type: 'number',
  })
  messageTime: number;

  @property({
    type: 'number',
  })
  messageSize: number;

  @property({
    type: 'string',
  })
  response: string;

  @property({
    type: 'number',
  })
  messageId: number;

  @property(() => Envelope)
  envelope: Envelope;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Nodemailer>) {
    super(data);
  }
}

export interface NodemailerRelations {
  // describe navigational properties here
}

export type NodemailerWithRelations = Nodemailer & NodemailerRelations;
