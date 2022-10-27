import {
  Client, createRestAppClient,
  givenHttpServerConfig
} from '@loopback/testlab';
import {AuthenticationBindings} from 'loopback4-authentication';
import {ShoppingappApplication} from '../..';

export async function setupApplication(): Promise<AppWithClient> {

  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new ShoppingappApplication({
    rest: restConfig,
  });
  setEnvVars();
  await app.boot();

  app.bind('datasources.config.postgresql').to({
    name: 'postgresql',
    connector: 'postgresql'
  })
  app.bind('datasources.config.pgdb').to({
    name: 'postgresql',
    connector: 'memory',
  });

  app.bind(AuthenticationBindings.CURRENT_USER).to({
    id: 0,
    username: '',
    password: 'string',

  });




  await app.start();


  const client = createRestAppClient(app);

  return {app, client};
}

export function setEnvVars() {
  process.env.DB_HOST = '';
  process.env.DB_PORT = '';
  process.env.DB_USER = '';
  process.env.DB_PASSWORD = '';
  process.env.DB_SCHEMA = '';
  process.env.JWT_SECRET = 'jwt-secret';
  process.env.JWT_ISSUER = 'jwt';
  process.env.SALT_ROUNDS = '';

}
export interface AppWithClient {
  app: ShoppingappApplication;
  client: Client;
}

