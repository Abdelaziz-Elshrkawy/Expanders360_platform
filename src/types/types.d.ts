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
