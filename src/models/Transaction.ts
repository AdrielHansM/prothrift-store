interface Transaction {
  transactionId: string,
  productId: string,
  buyerId: string,
  sellerId: string,
  transactionStatus: string,
  voucherApplied: boolean,
  dateUpdated: Date,
  dateCreated: Date
}

export default Transaction;