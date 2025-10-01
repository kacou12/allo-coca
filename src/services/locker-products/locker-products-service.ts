import type { OrderFiltersPayload } from "../global.type";
import { createOrderApi, fetchFilterOrdersApi, fetchProductsByCategoryApi } from "./locker-products-api"
import type { CreateOrderPayload, DeliveryPayload, ProductResponse } from "./locker-products-type"
import type { OrderResponse } from "./order-type";

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


export async function fetchFilterOrders(
  payload?: OrderFiltersPayload,
): Promise<PaginationResponse<OrderResponse> | undefined> {
  try {
    const res = await fetchFilterOrdersApi(payload)
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
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