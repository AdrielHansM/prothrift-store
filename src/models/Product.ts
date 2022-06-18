interface Product {
  productId: string;
  userId: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productWeight: number;
  imageUrl: string;
  meetup: string;
  category: string;
  status: string;
  isDeleted: boolean;
  isSold: boolean;
  dateCreated: Date;
  dateUpdated: Date;
}
  
export default Product;