import {OPERATION_SECURITY_SPEC} from '@loopback/authentication-jwt';
import {repository} from '@loopback/repository';
import {
  del,
  get,
  HttpErrors,
  param,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {Products, Shoppingcart} from '../models';
import {PermissionKey} from '../permission.enum';
import {ShoppingcartRepository} from '../repositories';

export class ShoppingcartController {
  constructor(
    @repository(ShoppingcartRepository)
    public shoppingcartRepository: ShoppingcartRepository,
  ) { }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['*']})
  @post('/shoppingcarts/{userId}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'User shopping cart is created or updated',
      },
    },
  })
  async create(
    @param.path.number('userId') userId: number,
    @requestBody({description: 'shopping cart'}) cart: any,
  ): Promise<void> {
    cart.userId = userId;

    console.log(userId, cart, 'cart');
    await this.shoppingcartRepository.create(cart);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @get('/shoppingcarts/{userId}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User shopping cart is read',
        content: {'application/json': {schema: {'x-ts-type': Shoppingcart}}},
      },
    },
  })
  async get(
    @param.path.number('userId') userId: number,
  ): Promise<Shoppingcart> {
    console.log('hiiiii its get');
    console.log('userid', userId);
    const cart = await this.shoppingcartRepository.findOne({where: {userId}});
    console.log(cart, 'yahi cart hai');
    if (cart == null) {
      console.log(1);
      throw new HttpErrors.NotFound();
      // `Shopping cart not found for user: ${userId}`,
    } else {
      console.log(2);
      return cart;
    }
  }



  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @del('/shoppingcarts/{userId}')
  @response(204, {
    description: 'CartItem DELETE success',
  })
  async deleteById(@param.path.number('userId') userId: number): Promise<void> {
    console.log('hiii');

    await this.shoppingcartRepository.deleteById(userId);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @post('/shoppingcarts/{userId}/items', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User shopping cart item is created',
        content: {
          'application/json': {schema: {'x-ts-type': Shoppingcart}},
        },
      },
    },
  })
  async addItem(
    @param.path.number('userId') userId: number,
    @requestBody({description: 'shopping cart item'}) item: Products,
  ): Promise<Shoppingcart | void> {
    const cartAlreadyexist = await this.shoppingcartRepository.findOne({
      where: {userId},
    });

    const cart = cartAlreadyexist ?? new Shoppingcart();
    console.log('hii this is the cart', userId);
    console.log('hiii this is the item in the cart', item);
    cart.userId = userId;
    if (cart.items == null) {
      cart.items = [item];
    } else {
      // cart.items = Object.assign(cart.items, item);
      cart.items.push(item);
    }
    console.log('**************');
    console.log(cart, 'ye idar');
    console.log('*******************');

    console.log(cart.items, 'cart ka item');
    console.log(cart, 'cart ye hai');
    console.log(item, 'item ye hai');
    if (cartAlreadyexist) {
      return this.shoppingcartRepository.update(cart, {userId});
    } else {
      return this.shoppingcartRepository.create(cart);
    }
    //return this.shoppingcartRepository.addItem(userId, item);
  }
}
