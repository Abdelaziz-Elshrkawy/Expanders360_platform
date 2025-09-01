import { Response } from 'express';
import { User } from 'src/entities/mysql/users.entity';
import { CookieOptionsI, ResponseObject } from 'src/types/types';
import { Repository } from 'typeorm';

export async function isEmailRegistered(
  userRepo: Repository<User>,
  email: string,
) {
  return await userRepo.findOne({
    where: {
      email,
    },
  });
}

export function ResponseObjectGenerator<T = object>(
  response: T | string,
  statusCode: number,
  res: Response,
  cookies?: CookieOptionsI[],
): ResponseObject<T> {
  if (cookies && cookies?.length > 0) {
    cookies.forEach(({ name, value, options }) => {
      res.cookie(name, value, { ...options });
    });
  }

  return res.status(statusCode).json({
    response,
    statusCode,
  });
}
