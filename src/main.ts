import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CsrfErrorConfig, doubleCsrf } from 'csrf-csrf';
import { CookiesName } from './types/enums';
import { HttpStatus } from '@nestjs/common';
import { json, NextFunction, Request, Response } from 'express';
import * as cookieParser from 'cookie-parser';
import { port } from './config/env';

export const { doubleCsrfProtection, generateCsrfToken } = doubleCsrf({
  cookieName: CookiesName.CSRF_Token,
  getSecret: () => new Date().getDate().toString(),
  getSessionIdentifier: (req) => req.ip || '',
  cookieOptions: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24,
  },
});

void (async function () {
  const app = await NestFactory.create(AppModule);
  await app.listen(port as string);
  console.log(port);
  app.enableCors({
    // for cookies
    credentials: true,
  });

  app.use(cookieParser());
  app.use(csrfMiddleware);
  app.use(json());
})();

/**
 * this middleware is to silence the terminal error for bad csrf and just return it to the response only for cleaner server loggers in production
 */
function csrfMiddleware(req: Request, res: Response, next: NextFunction) {
  doubleCsrfProtection(req, res, (err?: any) => {
    // the `EBADCSRFTOKEN` error string got it from the source code of the package
    if (err && (err as CsrfErrorConfig).code === 'EBADCSRFTOKEN') {
      return res.status(HttpStatus.FORBIDDEN).json({
        statusCode: HttpStatus.FORBIDDEN,
        message: (err as CsrfErrorConfig)?.message,
      });
    }
    next(err);
  });
}
