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
import {Sub_Categories} from '../models';
import {PermissionKey} from '../permission.enum';
import {SubCategoriesRepository} from '../repositories';

export class SubCategoriesController {
  constructor(
    @repository(SubCategoriesRepository)
    public subCategoriesRepository: SubCategoriesRepository,
  ) { }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @post('/sub-categories')
  @response(200, {
    description: 'SubCategories model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sub_Categories)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sub_Categories, {
            title: 'NewSubCategories',
            exclude: ['id'],
          }),
        },
      },
    })
    subCategories: Omit<Sub_Categories, 'id'>,
  ): Promise<Sub_Categories> {
    return this.subCategoriesRepository.create(subCategories);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @get('/sub-categories/count')
  @response(200, {
    description: 'SubCategories model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sub_Categories) where?: Where<Sub_Categories>,
  ): Promise<Count> {
    return this.subCategoriesRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @get('/sub-categories')
  @response(200, {
    description: 'Array of SubCategories model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sub_Categories, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sub_Categories) filter?: Filter<Sub_Categories>,
  ): Promise<Sub_Categories[]> {
    return this.subCategoriesRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @patch('/sub-categories')
  @response(200, {
    description: 'SubCategories PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sub_Categories, {partial: true}),
        },
      },
    })
    subCategories: Sub_Categories,
    @param.where(Sub_Categories) where?: Where<Sub_Categories>,
  ): Promise<Count> {
    return this.subCategoriesRepository.updateAll(subCategories, where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @get('/sub-categories/{id}')
  @response(200, {
    description: 'SubCategories model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sub_Categories, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Sub_Categories, {exclude: 'where'})
    filter?: FilterExcludingWhere<Sub_Categories>,
  ): Promise<Sub_Categories> {
    return this.subCategoriesRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @patch('/sub-categories/{id}')
  @response(204, {
    description: 'SubCategories PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sub_Categories, {partial: true}),
        },
      },
    })
    subCategories: Sub_Categories,
  ): Promise<void> {
    await this.subCategoriesRepository.updateById(id, subCategories);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @put('/sub-categories/{id}')
  @response(204, {
    description: 'SubCategories PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() subCategories: Sub_Categories,
  ): Promise<void> {
    await this.subCategoriesRepository.replaceById(id, subCategories);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @del('/sub-categories/{id}')
  @response(204, {
    description: 'SubCategories DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.subCategoriesRepository.deleteById(id);
  }
}
