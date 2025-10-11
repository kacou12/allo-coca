export type StatusConfigEnum = {
  value: string;
  name: string;
  color: string;
  textColor: string;
};
export const orderStatusConfigEnumData: StatusConfigEnum[] = [
  {
    value: "pending",
    name: "En attente",
    color: "#6c757d",
    textColor: "#ffffff",
  },
  {
    value: "processing",
    name: "En traitement",
    color: "#ffc107",
    textColor: "#000000",
  },
  { value: "paid", name: "Payée", color: "#28a745", textColor: "#ffffff" },
  {
    value: "cancelled",
    name: "Annulée",
    color: "#dc3545",
    textColor: "#ffffff",
  },
];

export interface OrderResponse {
  delivery: Delivery;
  status: string;
  total_amount: number;
  items: Item2[];
  id: string;
  user_id: string;
  user: User;
  order_date: string;
  reference: string;
}

interface Delivery {
  id: string;
  full_name: string;
  phone_number: string;
  municipality: string;
  address: string;
  notes: any;
  created_at: string;
  updated_at: string;
}

interface Item2 {
  id: string;
  type: string;
  variant: Variant;
  quantity: number;
  unit_price: number;
  line_total: number;
  items_details: ItemsDetails;
}

interface Variant {
  id: string;
  name: any;
  product: Product;
}

interface Product {
  id: string;
  name: string;
}

interface ItemsDetails {
  mode: string;
  ordered_packs: number;
  units_per_pack: number;
  units_in_pack_for_this_variant: number;
}

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  id: string;
  created_at: string;
  updated_at: string;
}
