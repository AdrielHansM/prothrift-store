interface Transaction {
  transactionId: string,
  productId: string,
  buyerId: string,
  sellerId: string,
  transactionStatus: string,
  voucherApplied: boolean,
  isReviewed: boolean,
  voucherId?: string,
  dateUpdated: Date,
  dateCreated: Date
}

export default Transaction;