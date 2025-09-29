import { createOrderApi, fetchProductsByCategoryApi } from "./locker-products-api"
import type { CreateOrderPayload, DeliveryPayload, ProductResponse } from "./locker-products-type"

export async function fetchProductsByCategory(
   category_id: string,
   filters: {
    page: number;
    limit: number;
}
): Promise<PaginationResponse<ProductResponse> | undefined> {
  try {
    const res = await fetchProductsByCategoryApi(category_id, filters);
    return res?.data
  } catch (error: any) {
    throw Error(error.response?.data?.message || error.message)
  }
}
export async function createOrder(
  data: CreateOrderPayload,
): Promise<PaginationResponse<any> | undefined> {
  try {
    const res = await createOrderApi(data)
    return res?.data
  } catch (error: any) {
    throw Error(error.response?.data?.message || error.message)
  }
}