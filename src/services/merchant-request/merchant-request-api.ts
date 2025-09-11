import type { DashboardTransactionsStatsPayload, DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { MerchantRequestsRouteApi } from './merchant-request-constants'
import type {
  MerchantDepositRequest,
  MerchantRequestResponse,
  MerchantWithdrawalRequest,
} from './merchant-request.type'
import type { RejectMerchantRequest } from './merchant-request-schema'
import { MerchantRequestStatusEnum, MerchantRequestTypeEnum } from '@/constants/constant.enum'
import type { MerchantStatsResponse } from '../merchants/merchant-type'

export async function fetchMerchantRequestsApi({
  payload,
}: {
  payload: DefaultFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<MerchantRequestResponse>> | undefined> {
  payload!.dates![0].setHours(0, 0, 0, 0)
  payload!.dates![1].setHours(23, 59, 59, 59)

  const formatPayload = {
    startDate: payload!.dates![0].toISOString(),
    endDate: payload!.dates![1].toISOString(),
    ...payload,
  }
  const result = await Http.get<SuccessResponse<PaginationResponse<MerchantRequestResponse>>>(
    MerchantRequestsRouteApi.default,
    formatPayload,
  )

  return result
}

export async function validateMerchantRequestApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(MerchantRequestsRouteApi.update(id), {
    status: MerchantRequestStatusEnum.Approved,
  })
}

export async function rejectMerchantRequestApi({
  id,
  data,
}: {
  id: string
  data: RejectMerchantRequest
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(MerchantRequestsRouteApi.update(id), data)
}

export async function depositRequestApi({
  data,
}: {
  data: MerchantDepositRequest
}): Promise<SuccessResponse<any> | undefined> {
  const formData = new FormData()

  formData.append('file_url', data.file_url!)
  formData.append('bank', data.bank!)
  formData.append('amount', data.amount!.toString())
  formData.append('type', MerchantRequestTypeEnum.Deposit)

  return await Http.post<SuccessResponse<any>>(MerchantRequestsRouteApi.default, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export async function withdrawalRequestApi({
  data,
}: {
  data: MerchantWithdrawalRequest
}): Promise<SuccessResponse<any> | undefined> {
  const formData = new FormData()

  // formData.append('rib', data.rib!);
  formData.append('amount', data.amount!.toString())
  formData.append('type', MerchantRequestTypeEnum.Withdrawal)

  return await Http.post<SuccessResponse<any>>(MerchantRequestsRouteApi.default, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
