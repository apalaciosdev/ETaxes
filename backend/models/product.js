const {Schema, model} = require('mongoose')

const ProductSchema = Schema({
  title: { type: String, required: [true, 'Title of the product is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  description: { type: String },
  category: { type: String, required: [true, 'Category is required'] },
  stars: { type: Number, required: [true, 'Stars are required'] },
  image: { type: String },
  state: {type: Boolean, default: true}
});

ProductSchema.methods.toJSON = function () {
  const { _id, __v, ...product } = this.toObject()
  product.uid = _id //change the name of _id to uid
  return product
}

module.exports = model('Product', ProductSchema);


