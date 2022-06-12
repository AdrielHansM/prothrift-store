interface Product {
  productName: string;
  status: string;
  meetupLocation: string;
  price: number;
  descrtipion: string;
  imageUrl: string;
  isDeleted: boolean;
  isSold: boolean;
  dateCreated: Date;
  dateUpdated: Date;
}
  
export default Product;