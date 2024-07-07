export interface IUsers {
  name?: string;
  email?: string;
  password?: string;
  googleId?: string;
  photo?: string;
}

export class userResponses {
  constructor(public statusCode: number, public message: string) {}
}

export enum ProfileAccess {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum role {
  USER = "user",
  ADMIN = "admin",
}
