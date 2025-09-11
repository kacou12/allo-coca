import { z } from 'zod'

import type { providerSchema } from './provider-schema'

export type ProviderForm = z.infer<typeof providerSchema>

export type ProviderRequest = ProviderForm & {}
export enum SupplierEnum {
  HUB2 = 'hub2',
  BIZAO = 'bizao',
  TOUCH_PAY = 'touch_pay',
  WAVE = 'wave',
  MTN = 'mtn',
}

export type ProviderResponse = {
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

export type ProviderUpdatePayload = {
  name?: string
  country?: string
  method?: string
  currency?: string
  is_available?: boolean
  supplier?: string // SupplierEnum
  default_payin_charge?: number
  default_payout_charge?: number
}
