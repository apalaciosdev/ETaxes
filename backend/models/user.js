const {Schema, model} = require('mongoose')

const UserSchema = Schema({
  name: {type: String, required: [true, 'Name is required']},
  mail: {type: String, required: [true, 'Mail is required'], unique: true},
  password: {type: String, required: [true, 'Password is required']},
  // img: {type: String},
  role: {type: String, required: true, default: 'USER_ROLE', enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE']},
  surname1: {type: String, required: false},
  surname2: {type: String, required: false},
  telephone: {type: String, required: false},
  gender: {type: String, required: true, default: 'M', enum: ['M', 'F', 'NB']},
  // telephone2: {type: Number, required:false},
  // identityNumber: {type: String, required: false},
  // bankAccount: {type: String, required: [true, 'Bank account is required']},
  address: {type: String, required: false},
  zipCode: {type: String, required: false},
  region: {type: String, required: false},
  
  billingAddress: {type: String, required: false},
  billingZipCode: {type: String, required: false},
  billingRegion: {type: String, required: false},


  state: {type: Boolean, default: true},
  google: {type: Boolean, default: false}
})

//remove __v & password in response view
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject()
  user.uid = _id //change the name of _id to uid
  return user
}

module.exports = model('User', UserSchema)