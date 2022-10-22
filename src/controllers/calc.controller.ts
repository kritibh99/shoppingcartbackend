import {get, param, response} from '@loopback/rest';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {PermissionKey} from '../permission.enum';

export class CalcController {
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @get('/add')
  @response(200, {})
  add(@param.query.number('a') a: number, @param.query.number('b') b: number) {
    return {value: a + b};
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @get('/subtract')
  @response(200, {})
  subtract(
    @param.query.number('a') a: number,
    @param.query.number('b') b: number,
  ) {
    return {value: a - b};
  }
}
