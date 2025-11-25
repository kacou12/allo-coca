export interface LockerProduct {
  quantity: number
  type: 'locker' | 'water'
  products: Product[]
}

export interface DeliveryPayload {
  fullName?: string
  phone?: string
  common?: string
  deliveryAdress?: string
  instructions?: string
}

export interface CartLine {
  id: string
  quantity: number
  type: 'fullLocker' | 'locker' | 'water'
  products: ProductResponse[]
}
export interface Product {
  id: string
  name: string
  description: string
  price: number
  icon_url: string
  quantity: number
  image_url: string

  // variant: string
}
export interface ProductResponse {
  id: string
  product_id: string
  description: string
  size: string
  label: string
  quantity: number
  unit_price: number
  image_url: string
  icon_url: string
  sort_order: number
  status: boolean
  created_at: string
  updated_at: string
  product: ProductVariant
}

export interface ProductVariant {
  id: string
  name: string
  description: string
  image_url: string
  category_id: string
  created_at: string
  status: boolean
}

export interface CasierProduct {
  quantity: number
  type: 'locker' | 'water' | 'fullLocker'
  products: ProductResponse[]
}

export interface CreateOrderPayload {
  delivery: Delivery
  order: Order
}

interface Delivery {
  full_name: string
  phone_number: string
  municipality: string
  address: string
  notes: string
}

interface Order {
  is_settled: boolean
  number_of_casier: number
  items: CartPayloadOrderLine[]
}

export interface CartPayloadOrderLine {
  qty: number
  type: 'locker' | 'water' | 'fullLocker'
  casierLines: CasierLine[]
}

interface CasierLine {
  variant_id: string
  qty: number
}
