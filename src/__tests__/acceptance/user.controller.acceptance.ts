// import {Client, expect} from '@loopback/testlab';
// import * as jwt from 'jsonwebtoken';
// import {AuthenticationBindings} from 'loopback4-authentication';
// import {ShoppingappApplication} from '../../application';
// import {UserController} from '../../controllers';
// import {Keyandpassword} from '../../models';
// import {AppUsersRepository} from '../../repositories';
// import {AuthService} from '../../services';
// import {setupApplication} from './test-helper';


// describe('UserManagementController', () => {
//   let app: ShoppingappApplication;
//   let client: Client;
//   let userManagementService: AuthService;
//   let userRepo: AppUsersRepository;
//   let controller: UserController;

//   const userData = {
//     email: 'test@loopback.io',
//     firstName: 'Example',
//     lastName: 'User',
//     username: '',
//     roles: ['customer'],
//     resetKey: '',
//   };

//   const userPassword = 'p4ssw0rd';
//   //   //   //   let expiredToken: string;

//   before('setupApplication', async () => {
//     ({app, client} = await setupApplication());
//     userRepo = await app.get('repositories.UserRepository');
//     userManagementService = await app.get('services.user.service');
//     // link tests to controller
//     expect(controller).to.be.undefined();
//   });
//   before(migrateSchema);


//   beforeEach(clearDatabase);

//   after(async () => {
//     await app.stop();
//   });




//   describe('forgot-password', () => {
//     it('throws error for PUT /users/forgot-password when resetting password for non logged in account', async () => {
//       const token = await authenticateUser();
//       const res = await client
//         .put('/forgot-password')

//         .send({
//           email: 'john@example.io',
//           password: 'p4ssw0rd',
//         })
//         .expect(403);

//       expect(res.body.error.message).to.equal('Invalid email address');
//     });

//     it('password reset returns an error when invalid password is used', async () => {
//       const token = await authenticateUser();

//       const res = await client
//         .put('/forgot-password')

//         .send({email: 'test@example.com', password: '12345'})
//         .expect(422);

//       expect(res.body.error.details[0].message).to.equal(
//         'must NOT have fewer than 8 characters',
//       );
//     });

//     it('returns token for a successful password reset', async () => {
//       const token = await authenticateUser();

//       const res = await client
//         .put('/forgot-password')

//         .send({email: userData.email, password: 'password@12345678'})
//         .expect(200);

//       expect(res.body.token).to.not.be.empty();
//     });
//   });

//   describe('reset-password-init', () => {
//     it('throws error for POST /reset-password-init with an invalid email', async () => {
//       const res = await client
//         .post('/reset-password/init')
//         .send({email: 'john'})
//         .expect(422);
//       expect(res.body.error.message).to.equal('Invalid email address');
//     });

//     it('throws error for POST /reset-password-init for non-existent account email', async () => {
//       const res = await client
//         .post('/reset-password/init')
//         .send({email: 'john@example'})
//         .expect(404);
//       expect(res.body.error.message).to.equal(
//         'No account associated with the provided email address.',
//       );
//     });

//     it('password reset throws error if email config is invalid', async () => {
//       const tempData = {
//         email: 'john@loopback.io',
//         firstName: 'Example',
//         lastName: 'User',
//         roles: ['customer'],
//         resetKey: '',
//       };

//       await client
//         .post('/users')
//         .send({...tempData, password: userPassword})
//         .expect(200);

//       await client
//         .post('/reset-password/init')
//         .send({email: 'john@loopback.io'})
//         .expect(500);
//     });

//     // TODO (mrmodise) configure environment variables in pipelines to add positive scenario test cases
//   });

//   describe('reset-password-finish', () => {
//     it('throws error for PUT /reset-password-finish with an invalid key', async () => {
//       const res = await client
//         .put('/reset-password/finish')
//         .send(
//           new Keyandpassword({
//             resetKey: 'john',
//             password: 'password1234',
//             confirmPassword: 'password1234',
//           }),
//         )
//         .expect(404);
//       expect(res.body.error.message).to.equal(
//         'No associated account for the provided reset key',
//       );
//     });

//     it('throws error for PUT /reset-password-finish with mismatch passwords', async () => {
//       const res = await client
//         .put('/reset-password/finish')
//         .send(
//           new Keyandpassword({
//             resetKey: 'john',
//             password: 'password123',
//             confirmPassword: 'password1234',
//           }),
//         )
//         .expect(422);
//       expect(res.body.error.message).to.equal(
//         'password and confirmation password do not match',
//       );
//     });
//   });

//   describe('authentication', () => {
//     it('login returns a JWT token', async () => {
//       const newUser = {
//         id: 0,
//         username: '',
//         password: '',
//         email: '',
//         firstname: '',
//         lastname: '',
//         rolesId: 0,

//       };

//       const res = await client
//         .post('/login')
//         .send({email: newUser.email, password: userPassword})
//         .expect(200);

//       const token = res.body.token;
//       expect(token).to.not.be.empty();
//     });

//     it('login returns an error when invalid email is used', async () => {
//       //await createAUser();
//       await setCurrentUser()
//       const res = await client
//         .post('/login')
//         .send({email: 'idontexist@example.com', password: userPassword})
//         .expect(401);

//       expect(res.body.error.message).to.equal('Invalid email or password.');
//     });

//     it('login returns an error when invalid password is used', async () => {
//       const newUser = {
//         id: 0,
//         username: '',
//         password: '',
//         email: '',
//         firstname: '',
//         lastname: '',
//         rolesId: 0,

//       };
//       const res = await client
//         .post('/login')
//         .send({email: newUser.email, password: 'wrongpassword'})
//         .expect(401);

//       expect(res.body.error.message).to.equal('Invalid email or password.');
//     });



//   });
//   async function clearDatabase() {
//     await userRepo.deleteAll();
//   }

//   async function migrateSchema() {
//     await app.migrateSchema();
//   }

//   //   async function createAUser() {
//   //     const userWithPassword = new AppUsers(userData);
//   //     userWithPassword.password = userPassword;
//   //     return userManagementService.createUser(userWithPassword);
//   //   }

//   //   //   //   /**
//   //   //   //    * Creates an expired token
//   //   //   //    *
//   //   //   //    * Specifying a negative value for 'expiresIn' so the
//   //   //   //    * token is automatically expired
//   //   //   //    */
//   //   //   // async function givenAnExpiredToken() {
//   //   //   //   setCurrentUser()
//   //   //   //   const newUser = {
//   //   //   //     id: 0,
//   //   //   //     username: '',
//   //   //   //     password: '',
//   //   //   //     email: '',
//   //   //   //     firstname: '',
//   //   //   //     lastname: '',
//   //   //   //     rolesId: 0,

//   //   //   //   };
//   //   //   //   const jwtSecret = app.getSync<string>(TokenServiceBindings.TOKEN_SECRET);
//   //   //   //   const tokenService: JWTService = new JWTService(jwtSecret, '-1');
//   //   //   //   const userProfile = {
//   //   //   //     [securityId]: newUser.id,
//   //   //   //     name: `${newUser.firstname} ${newUser.lastname}`,
//   //   //   //   };

//   //   //   // }

//   async function setCurrentUser() {
//     app.bind(AuthenticationBindings.CURRENT_USER).to(userData);
//     const token = jwt.sign(userData, process.env.JWT_SECRET as string, {
//       expiresIn: 180000,
//       issuer: process.env.JWT_ISSUER,
//     });
//   }

//   async function authenticateUser() {
//     const user = await setCurrentUser();

//     const res = await client
//       .post('/login')
//       .send({email: 'example@gmail.com', password: userPassword})
//       .expect(200);

//     return res.body.token;
//   }
// })
