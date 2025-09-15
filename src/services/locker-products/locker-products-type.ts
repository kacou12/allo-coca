
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

export interface CasierProduct {
  quantity: number,
  products:Product[]
} 
export interface CartLine {
  id: string,
  quantity: number,
  type: "full-locker" | "locker" | "water",
  products:Product[]
} 
