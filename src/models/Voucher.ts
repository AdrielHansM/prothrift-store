interface Voucher {
  voucherId: string,
  voucherValue: number,
  userId: string,
  isUsed: boolean,
  dateUpdated: Date,
  dateCreated: Date
}

export default Voucher;