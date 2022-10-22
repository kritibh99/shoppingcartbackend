import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {AppUsers} from '../models';
import {PermissionKey} from '../permission.enum';
import {AppUsersRepository} from '../repositories';

export class AppusersController {
  constructor(
    @repository(AppUsersRepository)
    public appUsersRepository: AppUsersRepository,
  ) { }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @post('/app-users')
  @response(200, {
    description: 'AppUsers model instance',
    content: {'application/json': {schema: getModelSchemaRef(AppUsers)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUsers, {
            title: 'NewAppUsers',
            exclude: ['id'],
          }),
        },
      },
    })
    appUsers: Omit<AppUsers, 'id'>,
  ): Promise<AppUsers> {
    return this.appUsersRepository.create(appUsers);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @get('/app-users/count')
  @response(200, {
    description: 'AppUsers model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(AppUsers) where?: Where<AppUsers>): Promise<Count> {
    return this.appUsersRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @get('/app-users')
  @response(200, {
    description: 'Array of AppUsers model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AppUsers, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AppUsers) filter?: Filter<AppUsers>,
  ): Promise<AppUsers[]> {
    return this.appUsersRepository.find();
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @patch('/app-users')
  @response(200, {
    description: 'AppUsers PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUsers, {partial: true}),
        },
      },
    })
    appUsers: AppUsers,
    @param.where(AppUsers) where?: Where<AppUsers>,
  ): Promise<Count> {
    return this.appUsersRepository.updateAll(appUsers, where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @get('/app-users/{id}')
  @response(200, {
    description: 'AppUsers model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AppUsers, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AppUsers, {exclude: 'where'})
    filter?: FilterExcludingWhere<AppUsers>,
  ): Promise<AppUsers> {
    return this.appUsersRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @patch('/app-users/{id}')
  @response(204, {
    description: 'AppUsers PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUsers, {partial: true}),
        },
      },
    })
    appUsers: AppUsers,
  ): Promise<void> {
    await this.appUsersRepository.updateById(id, appUsers);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @put('/app-users/{id}')
  @response(204, {
    description: 'AppUsers PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() appUsers: AppUsers,
  ): Promise<void> {
    await this.appUsersRepository.replaceById(id, appUsers);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @del('/app-users/{id}')
  @response(204, {
    description: 'AppUsers DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.appUsersRepository.deleteById(id);
  }
}
