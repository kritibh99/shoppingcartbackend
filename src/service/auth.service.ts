import {UserService} from '@loopback/authentication';
import {Credentials} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare, genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import {promisify} from 'util';
import {AppUsers} from '../models';
import {AppUsersRepository, RolesRepository} from '../repositories';
import {EmailService} from '../services/email.service';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export interface passwordHasher<T = string> {
  hashPasword(password: T): Promise<T>;
  comparePassword(providePass: T, storedPass: T): Promise<boolean>;
}

export class AuthService implements UserService<AppUsers, Credentials> {



  rounds: number | undefined;
  hasher: any;
  jwtSecret = 'secret';
  jwtExpiresIn = '1h';
  constructor(
    @repository(AppUsersRepository)
    protected appusersRepository: AppUsersRepository,
    @repository(RolesRepository)
    protected rolesRepository: RolesRepository,

    @inject('services.EmailService')
    public emailService: EmailService,
  ) { }
  verifyCredentials(credentials: Credentials): Promise<AppUsers> {
    throw new Error('Method not implemented.');
  }
  async validateUser(credentials: Credentials): Promise<AppUsers> {
    const foundUser = await this.appusersRepository.findOne({
      where: {
        username: credentials.username,
      },
      include: [{relation: 'roles'}],
    });

    if (!foundUser) {
      throw new HttpErrors.NotFound(
        `user not found with this ${credentials.username}`,
      );
    }
    const passwordMatched = await this.comparePassword(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('Password doesnt matches');
    }
    return foundUser;
  }

  async comparePassword(
    providePass: string,
    storedPass: string,
  ): Promise<boolean> {
    const passwordMatched = await compare(providePass, storedPass);

    return passwordMatched;
  }

  async hashPasword(password: string) {
    const salt = await genSalt(this.rounds);

    return hash(password, salt);
  }
  convertToUserProfile(user: AppUsers): UserProfile {
    const username = '';

    return {
      id: user.id,
      name: user.username,
      permissions: user.permissions,
      [securityId]: (user.id || '').toString(),
    };
  }
  async createUser(user: AppUsers) {
    const password = await this.hashPasword(user.password,);
    user.password = password;
    const users = await this.appusersRepository.create(_.omit(user, 'password'),)

    await this.appusersRepository.credentials(user.id).create({password});
    return user;

  };
  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error while generating token: User Profile is null',
      );
    }
    let token = '';
    try {
      token = signAsync(userProfile, process.env.JWT_SECRET, {
        expiresIn: this.jwtExpiresIn,
        issuer: process.env.JWT_ISSUER,
      });
    } catch (err) {
      throw new HttpErrors.Unauthorized(`Error while generating token: ${err}`);
    }

    return token;
  }
  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error Verifying Token: 'Token' is null`,
      );
    }
    let userProfile: UserProfile;
    try {
      const decryptedToken = await verifyAsync(token, process.env.JWT_SECRET, {
        issuer: process.env.JWT_ISSUER,
      });
      userProfile = {
        id: decryptedToken.id,
        name: decryptedToken.name,
        permissions: decryptedToken.permissions,
        [securityId]: decryptedToken.id,
      };
    } catch (err) {
      throw new HttpErrors.Unauthorized(
        `Error while Verifying Token: Token Not Valid`,
      );
    }

    return userProfile;
  }
}
