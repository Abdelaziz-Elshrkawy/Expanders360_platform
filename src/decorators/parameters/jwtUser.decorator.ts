import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTObjectT, RequestWithJWTObject } from 'src/types/types';

export const User = createParamDecorator(
  (propertyName: JWTObjectT | undefined, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest<RequestWithJWTObject>().user;

    return propertyName ? user[propertyName] : user;
  },
);
