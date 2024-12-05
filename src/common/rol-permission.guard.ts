import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user;

    if (!user) {
      return true;
    }

    console.log('entra a admin guard');

    if (user.rol === 'superadmin') return true;

    response.status(401).json({
      message: 'No tiene permisos de administrador',
    });

    return false;

    // if (user.rol === 'user') {
    //   response.status(401).json({
    //     message: 'No tiene permisos de administrador',
    //   });
    //   return false;
    // }

    // return true;
  }
}

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const user = request.user;

    if (!user) {
      return true;
    }

    console.log('entra a superadmin guard');

    if (user.rol === 'superadmin') return true;

    response.status(401).json({
      authorized: false,
      message: 'No tiene permisos de super administrador',
    });

    return false;
  }
}
