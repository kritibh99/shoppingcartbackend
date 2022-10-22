import {Client} from '@loopback/testlab';
import {ShoppingappApplication} from '../..';
import {PermissionKey} from '../../permission.enum';
import {ProductRepository} from '../../repositories';
import {setupApplication} from './test-helper';
describe('ProductController ', () => {
  let app: ShoppingappApplication;
  let client: Client;

  const products = {
    id: 0,
    title: "string",
    image: '',
    images: '',
    description: '',
    price: 0,
    sub_category_id: 0,
    quantitiy: 0
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

  before(givenProductRepo);

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  async function givenProductRepo() {
    const productRepo = await app.getRepository(ProductRepository);
  }


  // it('get GET /products  ', async () => {
  //   const response = await client
  //     .get('/products')
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200)
  //   expect(response.body).to.have.Array();
  // });

  // it('deletes all products by userid', async () => {
  //   await client
  //     .delete(`/products/${user.id}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(404)
  // })

});
