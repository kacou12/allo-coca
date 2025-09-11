// import { env } from '@/config/env'
import axios from '@/config/axios'
import type {
  AuthResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ResetPasswordRequest,
} from './auth-type'
import { getBearerToken, getDeviceId } from './auth-util'
import { AuthRouteApi } from './auth-constants'

export async function loginApi(data: LoginRequest) {
  // if (import.meta.env.VITE_MOCK_API == 'true') {
  // TODO: remove this once you have auth
  //   return { data: mockReponse.login } as any
  // }

  return await axios.post<SuccessResponse<LoginResponse>>(
    AuthRouteApi.login,
    data,
    //  {
    // headers: {
    //   'Device-Id': getDeviceId(),
    //   'Access-Control-Allow-Origin': '*',
    // },
    // }
  )
}
export async function profilApi() {
  // if (import.meta.env.VITE_MOCK_API == 'true') {
  // TODO: remove this once you have auth
  //   return { data: mockReponse.login } as any
  // }

  return await axios.get<SuccessResponse<AuthResponse>>(
    AuthRouteApi.profile,
  )
}
export async function updatePasswordApi({password , new_password}: {password: string, new_password: string}) {


  return await axios.post<SuccessResponse<any>>(
    AuthRouteApi.updatePassword,
    {
      password,
      new_password
    },
  )
}
export async function forgetPasswordApi({email}: {email: string}) {
 return await axios.post<SuccessResponse<any>>(
    AuthRouteApi.forgetPassword,
    {
      email
    },
  )
}
export async function resetPasswordApi(payload: ResetPasswordRequest) {
 return await axios.post<SuccessResponse<any>>(
    AuthRouteApi.resetPassword(payload.token),
    {
      new_password: payload.new_password,
      confirmed_password: payload.confirmed_password
    },
    
  )
}

export async function refreshTokenApi() {
  // return await axios.post<SuccessResponse<RefreshTokenResponse>>('/admin/api/v1/auth/refresh-token')
  return await axios.post<string>(AuthRouteApi.refreshToken)
}

export async function logoutApi() {
  return await axios.post(
    AuthRouteApi.logout,
    // {
    //   accessToken: getAccessToken(),
    // },
    {
      headers: {
        // 'Device-Id': getDeviceId(),
        Authorization: getBearerToken(),
      },
    },
  )
}
