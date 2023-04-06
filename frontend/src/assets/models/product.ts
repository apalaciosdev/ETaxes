export interface SupportSearch{
  nameAndSurnames: string
  mail: string,
  refProduct: string,
  content: string,
}


export interface Product{
  title: String,
  price: Number,
  description: String,
  category: String,
  stock: Number,
  stars: Number,
  image: String,
  user: String
}

export interface Offer{
  offerPercentage: Number,
  offerName: String,
  sellerMail: String,
  purchaseDate: Date
}
