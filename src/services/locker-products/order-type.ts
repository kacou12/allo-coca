

export interface OrderResponse {
  delivery: Delivery
  status: string
  total_amount: number
  items: Item2[]
  id: string
  user_id: string
  user: User
  order_date: string
}

interface Delivery {
  id: string
  full_name: string
  phone_number: string
  municipality: string
  address: string
  notes: any
  created_at: string
  updated_at: string
}

interface Item2 {
  id: string
  variant: Variant
  quantity: number
  unit_price: number
  line_total: number
  items_details: ItemsDetails
}

interface Variant {
  id: string
  name: any
  product: Product
}

interface Product {
  id: string
  name: string
}

interface ItemsDetails {
  mode: string
  ordered_packs: number
  units_per_pack: number
  units_in_pack_for_this_variant: number
}

interface User {
  name: string
  email: string
  phone: string
  address: string
  role: string
  id: string
  created_at: string
  updated_at: string

}
