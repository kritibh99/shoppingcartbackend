import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  FindRoute,
  HttpErrors,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  Send,
  SequenceActions,
  SequenceHandler
} from '@loopback/rest';
import {AuthenticateFn, AuthenticationBindings} from 'loopback4-authentication';
import {
  AuthorizationBindings,
  AuthorizeErrorKeys,
  AuthorizeFn
} from 'loopback4-authorization';
import {AuthServiceBindings} from './keys';
//import {AuthServiceBindings} from './keys';
import {AppUsers} from './models';
import {PermissionKey} from './permission.enum';
import {AppUsersRepository, RolesRepository} from './repositories';
import {AuthService} from './service/auth.service';

// ------------------------------------
export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @repository(AppUsersRepository)
    protected appusersRepository: AppUsersRepository,
    @repository(RolesRepository) protected roleRepository: RolesRepository,
    @inject(AuthorizationBindings.AUTHORIZE_ACTION)
    protected checkAuthorisation: AuthorizeFn,
    @inject(AuthServiceBindings.Auth_SERVICE)
    protected authService: AuthService,
    @inject(AuthenticationBindings.USER_AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn<AppUsers>,
    @inject(AuthenticationBindings.CLIENT_AUTH_ACTION)
    protected authenticateRequestClient: AuthenticateFn<AppUsers>,
  ) { }

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;

      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Methods', '*');
      response.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,OPTIONS,POST,PUT,DELETE',
      );
      response.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      );

      const route = this.findRoute(request);

      const args = await this.parseParams(request, route);

      request.body = args[args.length - 1];

      let permissions: string[] = [
        PermissionKey.SignUp,
        PermissionKey.LogIn,
        PermissionKey.Admin,
        PermissionKey.Customer,
      ];

      if (request.method === 'OPTIONS') {
        response.status(200);
        this.send(response, 'ok');
      }

      if (request.headers.authorization) {
        const userToken = request.headers.authorization.split(' ', 2)[1];

        const userProfile = await this.authService.verifyToken(userToken);

        const user: any = await this.appusersRepository.findById(
          userProfile.id,
          {
            include: [{relation: 'roles'}],
          },
        );

        if (user.roles?.permissions?.length > 0) {
          permissions = [...permissions, ...user.roles?.permissions];
        }
      }

      //This is the important line added for authorization. Needed for all 3 methods
      const isAccessAllowed: boolean = await this.checkAuthorisation(
        permissions, // do authUser.permissions if using method #1
        request,
      );

      // Checking access to route here
      if (!isAccessAllowed) {
        throw new HttpErrors.Forbidden(AuthorizeErrorKeys.NotAllowedAccess);
      }

      const result = await this.invoke(route, args);

      this.send(response, result);
    } catch (err) {
      this.reject(context, err);
    }
  }
}
