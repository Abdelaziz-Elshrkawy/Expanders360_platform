import { CookieOptions } from 'express';

export type OrmDatabaseType =
  | 'mysql'
  | 'postgres'
  | 'sqlite'
  | 'mssql'
  | 'mongodb';

export interface JWTObject {
  id: number;
  name: string;
  email: string;
  role?: string;
  institute_id: number;
}
export interface JwtBasePayload {
  iat?: number;
  exp?: number;
  nbf?: number;
  iss?: string;
  sub?: string;
  aud?: string | string[];
}

export type JWTPayLoad<T> = T & JwtBasePayload;

export type RequestWithJWTObject = Request & { user: JWTObject };

export type JWTObjectT = keyof JWTObject;

export type ResponseObject<T = object> = Response<{
  response: string | T;
  code: HttpStatus;
}>;

interface CookieOptionsI {
  name: string;
  value: string;
  options?: CookieOptions;
}
