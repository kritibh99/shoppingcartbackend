import {Client} from '@loopback/testlab';
import {ShoppingappApplication} from '../..';
import {PermissionKey} from '../../permission.enum';
import {ShoppingcartRepository} from '../../repositories';
import {AuthService} from '../../service/auth.service';
import {setupApplication} from './test-helper';
describe('ShoppingcartController', () => {
  let app: ShoppingappApplication;
  let client: Client;
  let userManagementService: AuthService;

  const shoppingcart = {
    id: 0,
    items: [{
      id: 0,
      title: "string",
      image: '',
      images: '',
      description: '',
      price: 0,
      sub_category_id: 0,
      quantitiy: 0
    }],
    userId: 0,
  }

  const userPassword = 'p4ssw0rd';
  let user = {
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

  before(givenShoppingCartRepo);

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  async function givenShoppingCartRepo() {
    const shoppingCartRepo = await app.getRepository(ShoppingcartRepository);
  }
  // it('deletes a shoppingcart by id', async () => {
  //   await client
  //     .delete(`/shoppingcarts/${shoppingcart.id}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(404)
  // });




  // it('post POST /shoppingcarts ', async () => {

  //   const res = await client
  //     .post('/shoppingcarts')
  //     .set('Authorization', `Bearer ${token}`)
  //     .set('Content-Type', 'application/json')
  //     .send({...shoppingcart})
  //   expect(res.body).to.equal(res.body);
  // });


  // it('get GET /shoppingcarts ', async () => {
  //   const response = await client
  //     .get('/shoppingcarts')

  //     .set('Content-Type', 'application/json')
  //     .expect(200)
  //   expect(response.body).to.have.Object();
  // });









});





