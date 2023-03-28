export interface IJwtPayload {
  id: number;
  email: string;
  username: string;
  role: string,
}

export interface IAuthToken extends IJwtPayload {
  iat: number;
  exp: number;
}

export interface IToken {
  generateToken(p: IJwtPayload): Promise<string>;
  authToken(t: string): Promise<IAuthToken>
}
