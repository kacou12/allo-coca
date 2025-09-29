import { z } from "zod";
import type { loginSchema } from "./auth-schema";
import type { MerchantResponse } from "../merchants/merchant-type";

export type LoginForm = z.infer<typeof loginSchema>;

export type Authentication = {
  access_token: string;
  access_token_type: string;
  duration: string;
  deviceId: string;
};

export type LoginRequest = LoginForm & {};

export type LoginResponse = Authentication & {
  user: AuthResponse;
};

export type RefreshTokenRequest = {
  grantType: "refresh_token";
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  deviceId: string;
};
export type ResetPasswordRequest = {
  new_password: string;
  confirmed_password: string;
  token: string;
};

export type AuthResponse = {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
};
