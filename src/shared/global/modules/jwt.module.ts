import { JwtModule } from '@nestjs/jwt';
import { jwt_expiration_period, jwt_secret } from 'src/config/env';

export const JWTModule = JwtModule.register({
  secret: jwt_secret,
  signOptions: {
    expiresIn: jwt_expiration_period,
  },
});
