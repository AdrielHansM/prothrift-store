interface Product {
  productId: string;
  productName: string;
  productPrice: number;
  productDescription: string;
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