interface Review {
  reviewId: string,
  productId: string,
  sellerId: string,
  userId: string,
  rating: Number,
  review: string,
  dateUpdated: Date,
  dateCreated: Date
}

export default Review;