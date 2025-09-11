export enum System {
  Locale = 'locale',
}

export enum EnvironmentsEnum {
  Sandbox = 'sandbox',
  Live = 'live',
}

export enum OperatorsEnum {
  Orange = 'orange',
  Mtn = 'mtn',
  Moov = 'moov',
  Wave = 'wave',
}

export enum KeyStatusEnum {
  active = 'active',
  revoked = 'revoked',
}

export enum MerchantStatusEnum {
  active = 'active',
  inactive = 'inactive',
}

export enum TransactionStatusEnum {
  Pending = 'pending',
  Processing = 'processing',
  Success = 'success',
  Failed = 'failed',
  Refunded = 'refunded',
}

export enum TransactionTypesEnum {
  Payin = 'payin',
  Payout = 'payout',
}
export enum MerchantRequestStatusEnum {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}
export enum MerchantRequestTypeEnum {
  Deposit = 'deposit',
  Withdrawal = 'withdrawal',
}

export enum FileTypeEnum {
  JPEG = 'jpeg',
  JPG = 'jpg',
  PNG = 'png',
  GIF = 'gif',
  BMP = 'bmp',
  WEBP = 'webp',
  SVG = 'svg',
  PDF = 'pdf',
  // Ajoutez d'autres types d'images si nécessaire
}
export enum WebhookEnum {
  TransactionCreated = 'transaction.created',
  TransactionProcessing = 'transaction.processing',
  TransactionPending = 'transaction.pending',
  TransactionUpdated = 'transaction.updated',
  TransactionFailed = 'transaction.failed',
  TransactionRefunded = 'transaction.refunded',
  TransactionSuccess = 'transaction.success',
}
