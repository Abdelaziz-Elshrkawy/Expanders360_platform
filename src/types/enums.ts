export enum CookiesName {
  CSRF_Token = '_csrf_token_',
  Jwt_Token = '_jwt_token_',
}

export enum Exceptions {
  User_Need_Signed_Up = 'need to signed up first',
  Not_Authorized = 'not authorized',
  Too_Many_Requests = 'Too many requests, please try again later',
}

export enum RolesE {
  ADMIN = 'admin',
  CLIeNET = 'client',
  // VENDOR = 'vendor', // if needed
}
