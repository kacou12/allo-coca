export enum Authentication {
  AccessToken = "access-token",
  RefreshToken = "allococa-refresh-token",
  DeviceId = "device-id",
  ExpiryIn = "expires-in",
}

export const AuthRouteApi = {
  login: "/client/api/v1/auth/login",
  register: "/client/api/v1/auth/register",
  profile: "/client/api/v1/auth/me",
  forgetPassword: "/client/api/v1/auth/forgot-password",
  resetPassword: (token: string) =>`/client/api/v1/auth/reset-password/${token}`,
  updatePassword: "/client/api/v1/auth/password-update",
  // getOne: (id: string) => `/api/v1/admins/${id}`,
  logout: "/client/api/v1/auth/logout",
  refreshToken: "/client/api/v1/auth/refresh",
};
