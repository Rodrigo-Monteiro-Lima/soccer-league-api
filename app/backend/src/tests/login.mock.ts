import User from "../database/models/user.model";

const login = {
  email: "email@email.com",
  password: "1234567"
}

const loginWithInvalidPassword = {
  email: "email@email.com",
  password: "123"
}

const loginWithInvalidEmail = {
  email: "emailemail.com",
  password: "123"
}

const user = {
  id: 1,
  email: "email@email.com",
  username: "email",
  password: "1234567",
  role: "user"
} as User;

const userWithIncorrectPassword = {
  id: 1,
  email: "email@email.com",
  username: "email",
  password: "1234567",
  role: "user"
} as User;

export { login, user, loginWithInvalidPassword, userWithIncorrectPassword, loginWithInvalidEmail };