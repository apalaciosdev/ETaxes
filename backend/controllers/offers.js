const mongoose = require('mongoose');
const Product = require("../models/product")
const Offer = require("../models/offers")


/**
 * Devuelve todas las ofertas creadas por todos los usuarios
 */
const offersGet = async (req, res = response) => {
  const offers = await Offer.find()
  res.json(offers)
}


/**
 * Sube una nueva oferta y actualiza el campo offerPrice de cada producto
 */
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
    const offerPrice = product.price - (product.price * offer.offerPercentage) / 100
    await Product.updateOne({ _id: product._id }, { offerPrice })
  })

  res.json({
    msg: "Offer saved",
    offer,
  })
}


/**
 * Elimina una oferta por id
 */
const deleteOffer = async (req, res = response) => {
  const { id } = req.params
  const offer = await Offer.findByIdAndDelete(id)


  if(offer.active){
    // Actualizar el precio de oferta para cada producto
    const products = await Product.find({})
    products.forEach(async (product) => {
      const offerPrice = 0
      await Product.updateOne({ _id: product._id }, { offerPrice })
    })
  }

  res.json({
    msg: "Offer deleted",
    offer,
  })
}


/**
 * Cuando se crea una oferta, 
 */
const activateOffer = async (req, res = response) => {
  const { id } = req.params
  const { mail } = req.body

  await Offer.updateMany({ sellerMail: mail }, { active: false })
  
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
    if(product.user===mail){
      const offerPrice = product.price - (product.price * offerActivated.offerPercentage) / 100
      await Product.updateOne({ _id: product._id }, { offerPrice })
    }
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
