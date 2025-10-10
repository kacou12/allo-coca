import router from "@/router";
import type {
  AuthResponse,
  LoginForm,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RegisterForm,
  RegisterRequest,
  ResetPasswordRequest,
} from "@/services/auth/auth-type";
import {
  destroySensitiveInfo,
  getDeviceId,
  getRefreshToken,
  saveToken,
} from "./auth-util";
import { AppRoute } from "@/constants/app-route";
import {
  forgetPasswordApi,
  loginApi,
  logoutApi,
  profilApi,
  refreshTokenApi,
  registerApi,
  resetPasswordApi,
  updatePasswordApi,
} from "./auth-api";
import type { AxiosError } from "axios";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/useAuthStore";

export async function loginWithCredential({ email, password }: LoginForm) {
  const toast = useToast();
  try {
    const data: LoginRequest = {
      email: email.toLowerCase().trim(),
      password: password.trim(),
    };

    const res = await loginApi(data);
    const { access_token, refresh_token } = res.data?.data! ?? {};
    saveToken(access_token, refresh_token);

    return res.data;
  } catch (error: any) {
    const localError = error as AxiosError<ErrorResponse>;
    toast.error(
      localError.response?.data.error ?? "Quelque chose s'est mal passé",
    );
  }
}
export async function registerUser(data: RegisterRequest) {
  const toast = useToast();
  try {
    const res = await registerApi(data);
    const { access_token, refresh_token } = res.data?.data! ?? {};
    saveToken(access_token, refresh_token);

    return res.data;
  } catch (error: any) {
    const localError = error as AxiosError<ErrorResponse>;
    toast.error(
      localError.response?.data.error ?? "Quelque chose s'est mal passé",
    );
  }
}

export async function updatePassword(payload: {
  password: string;
  new_password: string;
}) {
  const toast = useToast();
  try {
    const res = await updatePasswordApi(payload);

    return res.data;
  } catch (error: any) {
    const localError = error as AxiosError<ErrorResponse>;
    toast.error(
      localError.response?.data.error ?? "Quelque chose s'est mal passé",
    );
    throw error;
  }
}

export async function forgetPassword({ email }: { email: string }) {
  const toast = useToast();
  try {
    const res = await forgetPasswordApi({ email });

    return res.data;
  } catch (error: any) {
    const localError = error as AxiosError<ErrorResponse>;
    toast.error(
      localError.response?.data.error ?? "Quelque chose s'est mal passé",
    );
    throw error;
  }
}
export async function resetPassword(payload: ResetPasswordRequest) {
  const toast = useToast();
  try {
    const res = await resetPasswordApi(payload);

    return res.data;
  } catch (error: any) {
    const localError = error as AxiosError<ErrorResponse>;
    toast.error(
      localError.response?.data.error ?? "Quelque chose s'est mal passé",
    );
    throw error;
  }
}

export async function fetchProfil(): Promise<AuthResponse | undefined> {
  const toast = useToast();
  const { setUser } = useAuthStore();
  try {
    const res = await profilApi();
    setUser(res.data.data);

    return res.data.data;
  } catch (error: any) {
    const localError = error as AxiosError<ErrorResponse>;
    toast.error(
      localError.response?.data.message ?? "Quelque chose s'est mal passé",
    );
  }
}

export async function refreshToken(): Promise<LoginResponse | undefined> {
  try {
    // if (getRefreshToken() && getDeviceId()) {
    // const data: RefreshTokenRequest = {
    //   grantType: 'refresh_token',
    //   clientId: import.meta.env.CLIENT_ID ?? '',
    //   clientSecret: import.meta.env.CLIENT_SECRET ?? '',
    //   refreshToken: getRefreshToken() ?? '',
    // }

    const res = await refreshTokenApi(getRefreshToken()!);
    const { access_token, duration, refresh_token } = res.data?.data! ?? {};
    saveToken(access_token, refresh_token);
    // TODO: display dialog session expired
    return res.data.data;
  } catch (error: any) {
    // TODO: display dialog session expired
    destroySensitiveInfo();
    router.push({ name: AppRoute.LOGIN.name });
  }
}

export async function logout() {
  try {
    const res = await logoutApi();
    destroySensitiveInfo();
  } catch (err) {
    destroySensitiveInfo();
  }
  // router.push({ name: AppRoute.LOGIN.name })
}
