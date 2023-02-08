export interface User{
  name: string
  mail: string,
  password: string,
  password2: string,
  // img: {type: String},
  // role: {type: String, required: true, default: 'USER_ROLE', enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE']},
  surname1: string,
  surname2: string,
  telephone: string,
  gender: string,
  years: number,
  // telephone2: {type: Number, required:false},
  // identityNumber: {type: String, required: false},
  // bankAccount: {type: String, required: [true, 'Bank account is required']},
  address: string,
  zipCode: string,
  region: string,
  country: string,
  
  billingAddress: string,
  billingZipCode: string,
  billingRegion: string
  billingCountry: string
}