const {Schema, model} = require('mongoose')

const SalesSchema = Schema({
  productId: { type: String, required: [true, 'Title of the product is required'] },
  units: { type: Number, required: true },
  price: { type: Number, required: [true, 'Price is required'] },
  totalPrice: { type: Number, default: function() {
    return this.units * this.price;
  }},
  purchaseDate: {type: Date, required: false}
});

SalesSchema.methods.toJSON = function () {
  const { _id, __v, ...product } = this.toObject()
  product.uid = _id //change the name of _id to uid
  return product
}

module.exports = model('Sale', SalesSchema);


