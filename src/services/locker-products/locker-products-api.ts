import { Http } from '../Http'
import { lockerRouteApi } from './locker-products-constants'

import type { CreateOrderPayload, DeliveryPayload, ProductResponse } from './locker-products-type'


export async function fetchProductsByCategoryApi(
  category_id: string,   
  filters: {
    page: number;
    limit: number;
  }
): Promise<SuccessResponse<PaginationResponse<ProductResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<ProductResponse>>>(
    lockerRouteApi.default,
    {
      category_id,
     limit: filters.limit,
     page: filters.page
    }
    // {...filters, category_id}
  )
  return result
}

export async function createOrderApi(
  data: CreateOrderPayload,
): Promise<SuccessResponse<any> | undefined> {
  const result = await Http.post<SuccessResponse<any>>(
    lockerRouteApi.createOrder,
    data,
    {
      // headers: {
      //   'Device-Id': getDeviceId(),
      // },
    },
  )

  return result
}