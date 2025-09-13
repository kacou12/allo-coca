
export interface LockerProduct {
  quantity: number,
  type: "locker" | "water",
  products:Product[]
}
export interface Product {
  id: string,
  name: string,
  description: string,
  price: number
  quantity: number
  image: string
  variant: string
}
