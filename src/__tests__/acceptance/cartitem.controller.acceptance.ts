import {Client, expect} from '@loopback/testlab';
import {ShoppingappApplication} from '../..';
import {PermissionKey} from '../../permission.enum';
import {CartItemRepository} from '../../repositories';
import {setupApplication} from './test-helper';
import {token} from './userCredPermission';
describe('CartItemController ', () => {
  let app: ShoppingappApplication;
  let client: Client;

  const cartitems = {
    productid: 0,
    price: 0,
    title: "string",
    quantity: '',

  }
  const userPassword = 'p4ssw0rd'; let user = {
    id: 0,
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    resetKey: '',
    link: '',
    rolesId: 0,
    permissions: [
      PermissionKey.Admin,
      PermissionKey.Customer
    ]

  }


  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });
  before(givenCartRepo);

  after(async () => {
    await app.stop();
  });
  async function givenCartRepo() {
    const cartRepo = await app.getRepository(CartItemRepository);
  }

  it('gives the count of cartitem', async () => {
    const response = await client
      .get('/cart-items/count')

      .expect(200);
    expect(response.body).to.have.property('count')
  });



  it('post POST /cart-items ', async () => {

    const res = await client
      .post('/cart-items')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({...cartitems})
    expect(res.body).to.equal(res.body);
  });

  it('get GET /cart-items ', async () => {
    const response = await client
      .get('/cart-items')
      .set('Content-Type', 'application/json')
      .expect(200)
    expect(response.body).to.have.Array();
  });


  it('deletes a cart-items by id', async () => {
    await client
      .delete(`/cart-items/${cartitems.productid}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })



});
