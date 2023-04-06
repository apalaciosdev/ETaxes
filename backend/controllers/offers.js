const Sale = require("../models/sales")
const Product = require("../models/product")
const Offer = require("../models/offers")

const offersGet = async (req, res = response) => {
  const offers = await Offer.find()
  res.json(offers)
}

const offerPost = async (req, res = response) => {
  const offer = req.body

  await Offer.updateMany({}, { active: false })

  // Save in DB
  const newOffer = new Offer(offer)
  await newOffer.save()
  // offer.offerPercentage

  // Actualizar el precio de oferta para cada producto
  const products = await Product.find({})
  products.forEach(async (product) => {
    const offerPrice =
      product.price - (product.price * offer.offerPercentage) / 100
    await Product.updateOne({ _id: product._id }, { offerPrice })
  })

  // await Product.updateMany({}, { offerPrice: price - (price * offer.offerPercentage / 100)});

  res.json({
    msg: "Offer saved",
    offer,
  })
}

const deleteOffer = async (req, res = response) => {
  const { id } = req.params
  const offer = await Offer.findByIdAndDelete(id)

  res.json({
    msg: "Offer deleted",
    offer,
  })
}


const activateOffer = async (req, res = response) => {
  const { id } = req.params

  await Offer.updateMany({}, { active: false })
  
  // Find sale by ID
  const offerActivated = await Offer.findById(id);
  if (offerActivated) {
    // Update stock and save changes
    offerActivated.active = true;
    await offerActivated.save();
  }

  // Actualizar el precio de oferta para cada producto
  const products = await Product.find({})
  products.forEach(async (product) => {
    const offerPrice = product.price - (product.price * offerActivated.offerPercentage) / 100
    await Product.updateOne({ _id: product._id }, { offerPrice })
  })

  res.json({
    msg: "Offer activated",
    offerActivated,
  })
}

module.exports = {
  offersGet,
  offerPost,
  deleteOffer,
  activateOffer,
}
