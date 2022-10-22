// import {Client, expect} from '@loopback/testlab';
// import {ShoppingappApplication} from '../..';
// import {PermissionKey} from '../../permission.enum';
// import {RolesRepository} from '../../repositories';
// import {setupApplication} from './test-helper';
// describe('RolesController', () => {
//   let app: ShoppingappApplication;
//   let client: Client;

//   const role = {
//     id: 0,
//     name: '',
//     permissions: [
//       PermissionKey.Admin,
//       PermissionKey.Customer
//     ]

//   }
//   const userPassword = 'p4ssw0rd';
//   let user = {
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

//   before(givenRolesRepo)
//   before('setupApplication', async () => {
//     ({app, client} = await setupApplication());
//   });
//   async function givenRolesRepo() {
//     const rolesRepo = await app.getRepository(RolesRepository);
//   }

//   after(async () => {
//     await app.stop();
//   });




//   it('post POST /roles ', async () => {
//     await client
//       .post(`/roles/${role.id}`)

//       .set('Content-Type', 'application/json')
//       .send({...role})
//       .expect(200);
//     const res = await client
//       .post('/roles')
//       .set('Content-Type', 'application/json')
//       .send({...role})
//     expect(res.body).to.equal(res.body);
//   });




//   // });
//   // it('deletes a shoppingcart by id', async () => {
//   //   await client
//   //     .delete(`/roles/${role.id}`)
//   //     .set('Authorization', `Bearer ${token}`)
//   //     .expect(404)
//   // });


//   // it('post POST /roles ', async () => {

//   //   const res = await client
//   //     .post('/roles')

//   //     .set('Content-Type', 'application/json')
//   //     .send({...role})
//   //   expect(res.body).to.equal(res.body);
//   // });






//   // async function setCurrentUser() {
//   //   app.bind(AuthenticationBindings.CURRENT_USER).to(user);
//   //   token = jwt.sign(user, process.env.JWT_SECRET as string, {
//   //     expiresIn: 180000,
//   //     issuer: process.env.JWT_ISSUER,
//   //   });
//   // }


// });
