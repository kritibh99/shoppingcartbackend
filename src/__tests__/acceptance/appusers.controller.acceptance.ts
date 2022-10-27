import {Client, expect} from '@loopback/testlab';
import {HTTPError} from 'superagent';
import {ShoppingappApplication} from '../..';
import {UserController} from '../../controllers';
import {AppUsers} from '../../models';
import {PermissionKey} from '../../permission.enum';
import {AppUsersRepository} from '../../repositories';
import {AuthService} from '../../services';
import {setupApplication} from './test-helper';
import {token} from './userCredPermission';
describe('AppusersController', () => {
  let app: ShoppingappApplication;
  let client: Client;
  let userManagementService: AuthService;
  let userRepo: AppUsersRepository;
  let controller: UserController;

  const userData = {
    email: 'test@loopback.io',
    firstName: 'Example',
    lastName: 'User',
    roles: ['customer'],
    resetKey: '',
  };

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

  const userPassword = 'p4ssw0rd';
  //   let expiredToken: string;
  // before(setCurrentUser)

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());

  });
  before(givenUserRepo);



  after(async () => {
    await app.stop();
  });
  async function givenUserRepo() {
    userRepo = await app.getRepository(AppUsersRepository);
  }






  it('throws error for POST /app-users with a missing email', async () => {
    const res = await client
      .post('/app-users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        password: 'p4ssw0rd',
        firstName: 'Example',
        lastName: 'User',
      })
      .expect(422);

    expect(res.error).to.not.eql(false);

  });

  it('throws error for POST /app-users with an invalid email', async () => {
    const res = await client
      .post('/app-users')
      .send({
        email: 'test@loop&back.io',
        password: 'p4ssw0rd',
        firstName: 'Example',
        lastName: 'User',
      })
      .expect(422);

    expect(res.body.error.message).to.equal('The request body is invalid. See error object `details` property for more info.');
  });

  it('throws error for POST /app-users with a missing password', async () => {
    const res = await client
      .post('/app-users')
      .send({
        email: 'test@loopback.io',
        firstName: 'Example',
        lastName: 'User',
      })
      .expect(422);

    expect(res.error).to.not.eql(false);
    const resError = res.error as HTTPError;
    const errorText = JSON.parse(resError.text);
    expect(errorText.error.details[0].info.missingProperty).to.equal(
      'username',
    );
  });

  it('throws error for POST /app-users with a string', async () => {
    const res = await client.post('/app-users').send('hello').expect(415);
    expect(res.body.error.message).to.equal(
      'Content-type application/x-www-form-urlencoded does not match [application/json].',
    );
  });



  it('get all appusers ', async () => {
    const res = await client
      .get(`/app-users`)
      .set('Content-Type', 'application/json')
      .expect(200)
    expect(res.body).to.have.Array();
  });

  it('deletes all appusers', async () => {
    const response = await client
      .delete(`/app-users/${user.id}`)

      .set('Content-Type', 'application/json')
      .expect(404)
  });


  it('post all appusers ', async () => {
    const userobj = {
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
    const response = await client
      .post('/app-users')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'appliation/json')
      .send({...userobj})
    expect(response.body).to.equal(response.body);
  })


  async function clearDatabase() {
    await userRepo.deleteAll();
  }

  async function migrateSchema() {
    await app.migrateSchema();
  }

  async function createAUser() {
    const userWithPassword = new AppUsers(userData);
    userWithPassword.password = userPassword;
    return userManagementService.createUser(userWithPassword);
  }




  async function authenticateUser() {
    const user = await createAUser;

    const res = await client
      .post('/users/login')
      .set('Authorization', `Bearer ${token}`)
      .send({email: 'example@gmail.com', password: userPassword})
      .expect(200);

    return res.body.token;
  }
});
