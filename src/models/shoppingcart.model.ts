import {belongsTo, Entity, model, property} from '@loopback/repository';
import {AppUsers} from './app-users.model';
import {Products} from './product.model';

@model()
export class Shoppingcart extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;
  // @property({
  //   type: 'object',
  // })
  // items?: Products;
  @property.array(Products)
  items?: Products[];
  // @property.array({
  //   type: 'array',
  //   itemType: 'object',
  // })
  // items?: Products[];
  @belongsTo(() => AppUsers)
  userId: number;
  // @property.array({
  //   type:'array',
  //   itemType:'object'
  // })
  // items?: Products[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Shoppingcart>) {
    super(data);
  }
}

export interface ShoppingcartRelations {
  // describe navigational properties here
}

export type ShoppingcartWithRelations = Shoppingcart;
