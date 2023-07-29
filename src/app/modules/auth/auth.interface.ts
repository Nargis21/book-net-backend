export type ILoginUser = {
  userEmail: string;
};

export type IUserLoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
