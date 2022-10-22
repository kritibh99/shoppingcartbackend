import {
  JWTAuthenticationComponent,
  UserServiceBindings
} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import * as dotenv from 'dotenv';
import {AuthenticationComponent, Strategies} from 'loopback4-authentication';
import {
  AuthorizationBindings,
  AuthorizationComponent
} from 'loopback4-authorization';
import path from 'path';
import {PostgresqlDataSource} from './datasources';
import {AuthServiceBindings} from './keys';
import {BearerTokenVerifyProvider} from './providers/provider';
import {MySequence} from './sequence';
import {AuthService} from './service/auth.service';
import {EmailService} from './services/email.service';

export {ApplicationConfig};

export class ShoppingappApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    dotenv.config();
    super(options);
    this.setUpBindings();
    //this.addSecurityspec();
    // Set up the custom sequence
    this.sequence(MySequence);

    // Mount authentication system
    this.component(AuthenticationComponent);
    this.bind('service.auth.service').toClass(AuthService);
    this.bind('services.email.service').toClass(EmailService);
    //this.bind('services.validator').toClass(Validator);
    // this.bind('service.AuthService')
    //   .toClass(AuthService)
    //   .inScope(BindingScope.REQUEST);
    this.bind(Strategies.Passport.BEARER_TOKEN_VERIFIER).toProvider(
      BearerTokenVerifyProvider,
    );
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    this.dataSource(PostgresqlDataSource, UserServiceBindings.DATASOURCE_NAME);

    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    this.bind(AuthorizationBindings.CONFIG).to({
      allowAlwaysPaths: ['/explorer'],
    });
    this.component(AuthorizationComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
  setUpBindings(): void {
    this.bind(AuthServiceBindings.Auth_SERVICE).toClass(AuthService);
  }
}
