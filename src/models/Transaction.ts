interface Transaction {
  transactionId: string,
  productId: string,
  buyerId: string,
  sellerId: string,
  transactionStatus: string,
  dateUpdated: Date,
  dateCreated: Date
}

export default Transaction;