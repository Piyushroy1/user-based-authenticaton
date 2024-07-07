export interface ILogin {
  googleId?: string;
  email: string;
  name?: string;
  password?: string;
}

export interface ISignup {
  email: string;
  name: string;
  password: string;
  confirmPassword?: string;
}

export class AuthResponses {
  constructor(public statusCode: number, public message: string) {}
}
