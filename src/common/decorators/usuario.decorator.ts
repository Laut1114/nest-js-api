import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Usuario = createParamDecorator((data, ctx: ExecutionContext) => {
  // se obtiene desde ctx (context) de la app la peticion y se extrae el user
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
