import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Categories} from './categories.model';

@model()
export class Sub_Categories extends Entity {
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
  title: string;

  @property({
    type: 'number',
    required: true,
  })
  category_id: number;

  @belongsTo(() => Categories)
  categoriesId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Sub_Categories>) {
    super(data);
  }
}

export interface SubCategoriesRelations {
  // describe navigational properties here
}

export type SubCategoriesWithRelations = Sub_Categories &
  SubCategoriesRelations;
