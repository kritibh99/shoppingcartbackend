import {Entity, model, property} from '@loopback/repository';

@model({name: 'cart_item'})
export class CartItem extends Entity {
  @property({
    type: 'number',
    id: true,
    //generated: true,
  })
  productid: number;

  // @property({
  //   type: 'number',
  //   //required: true,
  // })
  // productid: number;

  @property({
    type: 'number',
    //required: true,
  })
  price?: number;

  @property({
    type: 'string',
    //required: true,
  })
  title: string;

  @property({
    type: 'number',
    //required: true,
  })
  quantity: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CartItem>) {
    super(data);
  }
}

export interface CartItemRelations {
  // describe navigational properties here
}

export type CartItemWithRelations = CartItem & CartItemRelations;
