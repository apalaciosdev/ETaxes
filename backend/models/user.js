const {Schema, model} = require('mongoose')

const UserSchema = Schema({
  name: {type: String, required: [true, 'Name is required']},
  mail: {type: String, required: [true, 'Mail is required'], unique: true},
  password: {type: String, required: [true, 'Password is required']},
  img: {type: String},
  role: {type: String, required: true, default: 'USER_ROLE', enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE']},
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