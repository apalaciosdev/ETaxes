const {Schema, model} = require('mongoose')

const OffersSchema = Schema({
  offerPercentage: { type: Number, required: true },
  purchaseDate: {type: Date, required: false},
  sellerMail: {type: String, required: true}
});

OffersSchema.methods.toJSON = function () {
  const { _id, __v, ...offer } = this.toObject()
  offer.uid = _id //change the name of _id to uid
  return offer
}

module.exports = model('Offer', OffersSchema);


