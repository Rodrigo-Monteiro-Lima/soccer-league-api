import User from "../../database/models/user.model";
import { IAuthToken } from "../../interfaces/auth.interface";

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

const tkn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVmFsdWVzIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJfcHJldmlvdXNEYXRhVmFsdWVzIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJ1bmlxbm8iOjEsIl9jaGFuZ2VkIjp7fSwiX29wdGlvbnMiOnsiaXNOZXdSZWNvcmQiOmZhbHNlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIiwicmF3Ijp0cnVlLCJhdHRyaWJ1dGVzIjpbImlkIiwidXNlcm5hbWUiLCJyb2xlIiwiZW1haWwiLCJwYXNzd29yZCJdfSwiaXNOZXdSZWNvcmQiOmZhbHNlLCJpYXQiOjE2Nzk1MjQwMjIsImV4cCI6MTY3OTUyNzYyMn0.-Arx7Og4eNHF8Fw-VL5XhmElyWlTiCsBPPEHK3qmr1w';

const userFromToken = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  iat: 1679524022,
  exp: 1679527622
} as IAuthToken;



export { login, user, loginWithInvalidPassword, userWithIncorrectPassword, loginWithInvalidEmail, tkn, userFromToken };