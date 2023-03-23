const Product = require('../models/product')


const productsGet = async(req, res = response) => {

   const { limit/* = 15*/, from = 0 } = req.query  // http://localhost:2022/api/users??limit=10&from=3

  const [ total, products ] = await Promise.all([
    Product.countDocuments({state: true}), //total users
    Product.find({state: true}) // only works on users that they status=true (that means the user exists). Fisically, we will not remove the users, only we will change they status to false.
    .skip(Number(from))
    .limit(Number(limit)) //convert string to number
  ])

  res.json(
    products
  )
}

const userProducts = async(req, res = response) => { 
  const { user } = req.body

  const products = await Product.find({user})
  
  res.json(
    products
  ) 
}


const checkUserHaveProduct = async(req, res = response) => {
  const { user, productId } = req.body

  Product.findOne({ _id: productId, user: user }) // Consulta para buscar el producto por ID y correo electrónico
    .then(product => {
      if (!product) { // Si no se encuentra el producto
        return res.status(200).json({
          exists: false,
        });
      }
      res.status(200).json({exists: true, product}); // Si se encuentra el producto, devolverlo
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error en el servidor',
        error: error
      });
    });
}

const productGet = async(req, res = response) => { //get only 1 product
  const { id } = req.params
  console.log('id', id)

  const product = await Product.findById(id)
  
  res.json(
    product
  )
}

const productsPost = async(req, res = response) => {
  const product = req.body
  const newProduct = new Product(product)

  // Save in DB
  await newProduct.save()

  res.json({
    msg: "Product saved",
    product
  })
}

const productsPut = async(req, res = response) => {

  const { id } = req.params

  const { _id, state, ...rest } = req.body //exclude status and _id & modify the ...rest data

  const productDB = await Product.findByIdAndUpdate(id, rest) //update the data (...rest) that have the same id

  res.json({
    msg: "get put - controller",
    productDB
  })
}

const productsDelete = async(req, res = response) => {

  const { id } = req.params

  const product = await Product.findByIdAndDelete(id)

  res.json({
    product
  })
}

const productExists = async(req, res = response) => {

  const { id } = req.params
  
  // Verify if product exists
  const product = await Product.findById( id )
  if(!product){
    return res.status(200).json({
      msg: false
    })
  }

  res.json({
    msg: true
  })
}

module.exports = {
  productsGet,
  productGet,
  productsPost,
  productsPut,
  productsDelete,
  productExists,
  userProducts,
  checkUserHaveProduct
}