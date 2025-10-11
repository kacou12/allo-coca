import type { DefaultFiltersPayload } from "../global.type";
import {
  depositRequestApi,
  fetchMerchantRequestsApi,
  rejectMerchantRequestApi,
  validateMerchantRequestApi,
  withdrawalRequestApi,
} from "./merchant-request-api";
import type { RejectMerchantRequest } from "./merchant-request-schema";
import type {
  MerchantDepositRequest,
  MerchantRequestResponse,
  MerchantWithdrawalRequest,
} from "./merchant-request.type";

export async function fetchMerchantRequests(
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<MerchantRequestResponse> | undefined> {
  try {
    const res = await fetchMerchantRequestsApi({
      payload,
    });

    const customData = res?.data;

    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    });

    return customData;
  } catch (error: any) {
    throw new Error(error.response.data.msg);
  }
}

export async function validateMerchantRequest({
  id,
}: {
  id: string;
}): Promise<any | undefined> {
  try {
    const res = await validateMerchantRequestApi({
      id: id,
    });

    return res?.data;
  } catch (error: any) {
    throw new Error(error.response.data.msg);
  }
}

export async function rejectMerchantRequest({
  id,
  data,
}: {
  id: string;
  data: RejectMerchantRequest;
}): Promise<any | undefined> {
  try {
    const res = await rejectMerchantRequestApi({
      data: data,
      id: id,
    });

    return res?.data;
  } catch (error: any) {
    throw new Error(error.response.data.msg);
  }
}

export async function depositRequest(
  data: MerchantDepositRequest,
): Promise<any | undefined> {
  try {
    const res = await depositRequestApi({
      data: data,
    });

    return res?.data;
  } catch (error: any) {
    throw new Error(error.response.data.msg);
  }
}

export async function withdrawalRequest(
  data: MerchantWithdrawalRequest,
): Promise<any | undefined> {
  try {
    const res = await withdrawalRequestApi({
      data: data,
    });

    return res?.data;
  } catch (error: any) {
    throw new Error(error.response.data.msg);
  }
}
