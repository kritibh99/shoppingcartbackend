import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {Shoppingcart} from '../models';

export class ShoppingcartRepository extends DefaultCrudRepository<
  Shoppingcart,
  typeof Shoppingcart.prototype.id
  //ShoppingcartRelations
> {
  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,
  ) {
    super(Shoppingcart, dataSource);
  }

  // addItem(userId: number, item: CartItem) {
  //   const task: Task<Shoppingcart> = {
  //     run: async () => {
  //       const addItemToCart = (cart: Shoppingcart | null) => {
  //         let num = userId;
  //         let str = num.toString();
  //         cart = cart ?? new Shoppingcart({str});
  //         cart.items = cart.items ?? [];
  //         cart.items.push(item);
  //         return cart;
  //       };
  //       const result = await this.checkAndSet(userId, addItemToCart);
  //       return {
  //         done: result != null,
  //         value: result,
  //       };
  //     },
  //     description: `update the shopping cart for '${userId}'`,
  //   };
  //   return retry(task, {maxTries: 10, interval: 10});
  // }
  // async checkAndSet(
  //   userId: number,
  //   check: (current: Shoppingcart | null) => Shoppingcart | null,
  // ) {
  //   const connector = this.modelClass.dataSource!.connector!;
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const execute = promisify((cmd: string, args: any[], cb: Function) => {
  //     // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //     connector.execute!(cmd, args, cb);
  //   });
  //   await execute('WATCH', [userId]);
  //   let cart: Shoppingcart | null = await this.get(userId);
  //   cart = check(cart);
  //   if (!cart) return null;
  //   await execute('MULTI', []);
  //   await this.set(userId, cart);
  //   const result = await execute('EXEC', []);
  //   return result == null ? null : cart;
  // }
}
