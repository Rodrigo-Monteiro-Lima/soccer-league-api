export interface ILogin {
  email: string;
  password: string
}

export interface ILoginValidation {
  validateLogin: (login: ILogin) => void
}
