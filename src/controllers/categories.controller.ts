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
import {Categories} from '../models';
import {PermissionKey} from '../permission.enum';
import {CategoriesRepository} from '../repositories';

export class CategoriesController {
  constructor(
    @repository(CategoriesRepository)
    public categoriesRepository: CategoriesRepository,
  ) { }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @post('/categories')
  @response(200, {
    description: 'Categories model instance',
    content: {'application/json': {schema: getModelSchemaRef(Categories)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {
            title: 'NewCategories',
            exclude: ['id'],
          }),
        },
      },
    })
    categories: Omit<Categories, 'id'>,
  ): Promise<Categories> {
    return this.categoriesRepository.create(categories);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @get('/categories/count')
  @response(200, {
    description: 'Categories model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Categories) where?: Where<Categories>,
  ): Promise<Count> {
    return this.categoriesRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @get('/categories')
  @response(200, {
    description: 'Array of Categories model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Categories, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Categories) filter?: Filter<Categories>,
  ): Promise<Categories[]> {
    return this.categoriesRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @patch('/categories')
  @response(200, {
    description: 'Categories PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {partial: true}),
        },
      },
    })
    categories: Categories,
    @param.where(Categories) where?: Where<Categories>,
  ): Promise<Count> {
    return this.categoriesRepository.updateAll(categories, where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @get('/categories/{id}')
  @response(200, {
    description: 'Categories model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Categories, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Categories, {exclude: 'where'})
    filter?: FilterExcludingWhere<Categories>,
  ): Promise<Categories> {
    return this.categoriesRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @patch('/categories/{id}')
  @response(204, {
    description: 'Categories PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {partial: true}),
        },
      },
    })
    categories: Categories,
  ): Promise<void> {
    await this.categoriesRepository.updateById(id, categories);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @put('/categories/{id}')
  @response(204, {
    description: 'Categories PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() categories: Categories,
  ): Promise<void> {
    await this.categoriesRepository.replaceById(id, categories);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.Admin, PermissionKey.Customer]})
  @del('/categories/{id}')
  @response(204, {
    description: 'Categories DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.categoriesRepository.deleteById(id);
  }
}
