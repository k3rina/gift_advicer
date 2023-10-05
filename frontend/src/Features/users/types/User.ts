export type User = {
  id: number;
  login: string;
  email: string;
  errorMessage?: string;
};

export type UserId = User['id'];

export type UserAuthReg = {
  login: string;
  email: string;
  password: string;
  cpassword: string;
};

export type UserAuthLog = {
  email: string;
  password: string;
};
