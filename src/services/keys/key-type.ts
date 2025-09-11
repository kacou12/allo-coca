import { z } from 'zod'

import type { keySchema } from './key-schema'
import type { MerchantResponse } from '../merchants/merchant-type'

export type KeyForm = z.infer<typeof keySchema>

export type KeyRequest = {
  // merchant_id?: string
  environment: 'live' | 'sandbox'
  name: string
  // remark?: string
  // status?: 0 | 1
}



export interface KeyResponse {
  created_at: string
  environment: 'live' | 'sandbox'
  id: string
  key: string
  merchant: Merchant
  status: string
  merchant_id: string
  name: string
  updated_at: string
}

export interface Merchant {
  address: string
  balances: Balance[]
  business_name: string
  business_type: string
  created_at: string
  email: string
  id: string
  is_verified: boolean
  keys: string[]
  merchant_charges: MerchantCharge[]
  phone: string
  registration_no: string
  status: string
  tax_id: string
  updated_at: string
  users: User[]
  webhooks: Webhook[]
  website: string
}

export interface Balance {
  amount: number
  balance_histories: BalanceHistory[]
  created_at: string
  currency: string
  id: string
  merchant: string
  merchant_id: string
  type: string
  updated_at: string
}

export interface BalanceHistory {
  amount: number
  balance: string
  balance_id: string
  created_at: string
  id: string
  reason: string
  type: string
  updated_at: string
}

export interface MerchantCharge {
  created_at: string
  id: string
  merchant: string
  merchantID: string
  payin_charge: number
  payout_charge: number
  provider: Provider
  provider_id: string
  updated_at: string
}

export interface Provider {
  cashin_issuer_used: string[]
  cashout_issuer_used: string[]
  country_iso_code: string
  created_at: string
  currency: string
  default_payin_rate: number
  default_payout_rate: number
  id: string
  image_url: string
  method: string
  operator: string
  updated_at: string
}

export interface User {
  created_at: string
  email: string
  first_name: string
  id: string
  is_active: boolean
  is_verified: boolean
  last_login_at: string
  last_name: string
  merchant: string
  merchant_id: string
  phone: string
  role: string
  updated_at: string
}

export interface Webhook {
  created_at: string
  environment: string
  event: string
  id: string
  merchant: string
  merchant_id: string
  name: string
  secret: string
  updated_at: string
  url: string
}
