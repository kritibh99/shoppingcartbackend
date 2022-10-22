// import {Client, expect} from '@loopback/testlab';
// import {ShoppingappApplication} from '../..';
// import {PermissionKey} from '../../permission.enum';
// import {AppUsersRepository, SubCategoriesRepository} from '../../repositories';
// import {AuthService} from '../../service/auth.service';
// import {setupApplication} from './test-helper';
// import {token} from './userCredPermission';
// describe('SubCategoriesController ', async () => {
//   let app: ShoppingappApplication;
//   let client: Client;
//   let userManagementService: AuthService;
//   let userRepo: AppUsersRepository;
//   const subcategories = {
//     id: 0,
//     title: "string",
//     category_id: 0,
//     categoriesId: 0
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

//   before(givenSubCategoriesRepo);
//   async function givenSubCategoriesRepo() {
//     const subcategoryRepo = app.getRepository(SubCategoriesRepository)
//   }


//   it('deletes a sub-categories by id', async () => {
//     await client
//       .delete(`/sub-categories /${subcategories.id}`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(404)
//   });
//   it('get GET /sub-categories ', async () => {
//     const response = await client
//       .get('/sub-categories')
//       .set('Content-Type', 'application/json')
//       .expect(200)
//     expect(response.body).to.have.Array();
//   });

//   it('post POST /sub-categories ', async () => {

//     const res = await client
//       .post('/sub-categories')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Content-Type', 'application/json')
//       .send({...subcategories})
//     expect(res.body).to.equal(res.body);
//   });

//   it('updates Patch /sub-categories ', async () => {
//     const updateobj = {
//       id: 0,
//       title: "string",
//       category_id: 0,
//       categoriesId: 0
//     }
//     const res = await client
//       .patch('/sub-categories')
//       .set('Authorization', `Bearer ${token}`)
//       .send({...updateobj})
//     expect(res.body).to.equal(res.body);

//   })




//   // async function setCurrentUser() {
//   //   app.bind(AuthenticationBindings.CURRENT_USER).to(user);
//   //   token = jwt.sign(user, process.env.JWT_SECRET as string, {
//   //     expiresIn: 180000,
//   //     issuer: process.env.JWT_ISSUER,
//   //   });
//   // }


// });
