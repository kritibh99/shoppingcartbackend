import {TokenService} from '@loopback/authentication';
import {
  MyUserService,
  TokenServiceBindings,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {inject, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  post,
  requestBody,
  SchemaObject,
} from '@loopback/rest';
//import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {AppUsers, Keyandpassword, Resetpasswordinit} from '../models';
import {PermissionKey} from '../permission.enum';
import {Credentials} from '../repositories';
// import {PermissionKey} from '../permission.enum';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {v4 as uuidv4} from 'uuid';
import {AppUsersRepository} from '../repositories';
import {AuthService} from '../service/auth.service';
import {EmailService} from '../services/email.service';
const AppUsersSchema: SchemaObject = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 6,
    },
  },
};

export const RequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: AppUsersSchema},
  },
};
export class UserController {
  // redirect: any;
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    //public user: AppUsers,
    @service(AuthService)
    protected service: AuthService,
    @repository(AppUsersRepository)
    protected userRepository: AppUsersRepository,
    @inject('services.EmailService')
    public emailService: EmailService,
  ) {}

  @authorize({permissions: [PermissionKey.LogIn]})
  @post('/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(@requestBody(RequestBody) credentials: Credentials): Promise<{}> {
    //ensures that user exist and its password is correct.
    const user = await this.service.validateUser(credentials);
    console.log(user, 'hey its the user');
    const userProfile = this.service.convertToUserProfile(user);

    const token = await this.service.generateToken(userProfile);

    return {user, token};
  }

  @authorize({permissions: ['*']})
  @post('/reset-password/init')
  async resetPasswordInit(
    @requestBody() resetPasswordInit: Resetpasswordinit,
  ): Promise<string> {
    // checks whether email is valid as per regex pattern provided
    const email = await this.validateEmail(resetPasswordInit.email);
    const foundUser = await this.userRepository.findOne({
      where: {email},
    });

    if (!foundUser) {
      throw new HttpErrors.NotFound(
        'No account associated with  the provided email address.',
      );
    }
    foundUser.resetKey = uuidv4();
    const sentMessageInfo = await this.emailService.sendResetPasswordMail(
      foundUser,
    );
    foundUser.email;
    console.log('sentMessageInfo', JSON.stringify(sentMessageInfo));
    foundUser.link = sentMessageInfo;
    console.log(foundUser.link, 'founduser.link');
    console.log(foundUser, 'user');
    try {
      console.log(1);
      // Updates the user to store their reset key with error handling
      await this.userRepository.updateById(foundUser.id, foundUser);
    } catch (e) {
      console.log(3);
      return e;
    }

    let key = foundUser.resetKey;
    console.log(foundUser, 'updated');
    return key;
  }
  async validateEmail(email: string): Promise<string> {
    const emailRegPattern = /\S+@\S+\.\S+/;
    if (!emailRegPattern.test(email)) {
      throw new HttpErrors.UnprocessableEntity('Invalid email address');
    }
    return email;
  }

  @authorize({permissions: ['*']})
  @post('/reset-password/finish')
  async resetPasswordFinish(
    @requestBody() keyAndPassword: Keyandpassword,
  ): Promise<void> {
    // Checks whether password and reset key meet minimum security requirements
    const {resetKey, password} = await this.validateKeyPassword(keyAndPassword);
    //console.log('passwordand key', keyAndPassword, 'key');
    // Search for a user using reset key
    const foundUser = await this.userRepository.findOne({
      where: {resetKey: resetKey},
    });

    // No user account found
    if (!foundUser) {
      throw new HttpErrors.NotFound(
        'No associated account for the provided reset key',
      );
    }

    // Encrypt password to avoid storing it as plain text
    const passwordHash = await hash(password, await genSalt());
    console.log(passwordHash, 'passwordhash');
    console.log(foundUser.id, 'id hai');
    try {
      console.log('1');

      foundUser.password = passwordHash;
      console.log(foundUser.id, 'id hai abhi');
      // Remove reset key from database its no longer valid
      foundUser.resetKey = '';
      console.log('print founduser', foundUser);
      // Update the user removing the reset key
      await this.userRepository.updateById(foundUser.id, foundUser);
    } catch (e) {
      return e;
    }
  }

  async validateKeyPassword(
    keyAndPassword: Keyandpassword,
  ): Promise<Keyandpassword> {
    if (!keyAndPassword.password || keyAndPassword.password.length < 8) {
      throw new HttpErrors.UnprocessableEntity(
        'Password must be minimum of 8 characters',
      );
    }

    if (keyAndPassword.password !== keyAndPassword.confirmPassword) {
      throw new HttpErrors.UnprocessableEntity(
        'Password and confirmation password do not match',
      );
    }

    // if (
    //   keyAndPassword.resetKey.length === 0 ||
    //   keyAndPassword.resetKey.trim() === ''
    // ) {
    //   throw new HttpErrors.UnprocessableEntity('Reset key is mandatory');
    // }

    return keyAndPassword;
  }

  @authorize({permissions: [PermissionKey.SignUp]})
  @post('/signup', {
    responses: {
      '200': {
        description: 'AppUsers',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': AppUsers,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUsers, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: AppUsers,
  ): Promise<AppUsers> {
    const password = await hash(newUserRequest.password, await genSalt());
    console.log(password);
    console.log(newUserRequest, 'hiiiiii');
    newUserRequest.password = password;
    newUserRequest.roles = ['customer'];
    return this.userRepository.create(newUserRequest);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @get('/whoAmI', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    console.log('here');
    return currentUserProfile[securityId];
  }
}
