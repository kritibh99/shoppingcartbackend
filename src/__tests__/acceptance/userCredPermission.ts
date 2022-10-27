import * as jwt from 'jsonwebtoken';
import {PermissionKey} from '../../permission.enum';
const jwtSecret = 'jwt-secret';
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

export const token = jwt.sign(user, jwtSecret as string, {
  expiresIn: 180000,
  issuer: 'jwt',
});
