// import {Client, expect} from '@loopback/testlab';
// import {ShoppingappApplication} from '../..';
// import {PermissionKey} from '../../permission.enum';
// import {CategoriesRepository} from '../../repositories';
// import {setupApplication} from './test-helper';
// import {token} from './userCredPermission';
// describe('CategoriesController ', () => {
//   let app: ShoppingappApplication;
//   let client: Client;

//   const categories = {
//     id: 0,
//     title: "string",
//     image: ''
//   }
//   const userPassword = 'p4ssw0rd'; let user = {
//     id: 0,
//     username: '',
//     password: '',
//     email: '',
//     firstname: '',
//     lastname: '',
//     resetKey: '',
//     link: '',
//     rolesId: 0,
//     permissions: [
//       PermissionKey.Admin,
//       PermissionKey.Customer
//     ]

//   }





//   before('setupApplication', async () => {
//     ({app, client} = await setupApplication());
//   });

//   after(async () => {
//     await app.stop();
//   });
//   before(givenCartegoriesRepo);
//   async function givenCartegoriesRepo() {
//     const cartegoriesRepo = await app.getRepository(CategoriesRepository);
//   }



//   it('post POST /categories ', async () => {

//     const res = await client
//       .post('/categories ')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Content-Type', 'application/json')
//       .send({...categories})
//     expect(res.body).to.equal(res.body);
//   });

//   it('get GET /categories  ', async () => {
//     const response = await client
//       .get('/categories ')

//       .expect(200)
//     expect(response.body).to.have.Array();
//   });


//   it('deletes all categories by userid', async () => {
//     await client
//       .delete(`/categories /${user.id}`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(404)
//   })


//   it('deletes a categories by id', async () => {
//     await client
//       .delete(`/categories /${categories.id}`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(404)
//   });

//   it('updates all categories by userid', async () => {
//     const categoryobj = {
//       id: 0,
//       title: '',
//       image: ''

//     }
//     await client
//       .patch(`/categories/${categories.id}`)
//       .send({...categoryobj})
//       .expect(404);

//   })




// });
