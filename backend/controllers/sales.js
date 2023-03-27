const Sale = require('../models/sales')
const Product = require('../models/product')


const salesGet = async(req, res = response) => {

  const sales = await Sale.find();
  res.json(sales);
  
}

// const userProducts = async(req, res = response) => { 
//   const { user } = req.body

//   const products = await Product.find({user})
  
//   res.json(
//     products
//   ) 
// }


// const checkUserHaveProduct = async(req, res = response) => {
//   const { user, productId } = req.body

//   Product.findOne({ _id: productId, user: user }) // Consulta para buscar el producto por ID y correo electrónico
//     .then(product => {
//       if (!product) { // Si no se encuentra el producto
//         return res.status(200).json({
//           exists: false,
//         });
//       }
//       res.status(200).json({exists: true, product}); // Si se encuentra el producto, devolverlo
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: 'Error en el servidor',
//         error: error
//       });
//     });
// }

// const productGet = async(req, res = response) => { //get only 1 product
//   const { id } = req.params
//   console.log('id', id)

//   const product = await Product.findById(id)
  
//   res.json(
//     product
//   )
// }

const updateSaleStock = async (id, stock) => {

  console.log(id)
    // Find sale by ID
    const sale = await Product.findById(id);

    if (sale) {
      // Update stock and save changes
      sale.stock -= stock;
      await sale.save();
  
      console.log("UPDATED!!!!")
    }
};

const salesPost = async(req, res = response) => {
  const sale = req.body
  console.log(sale)
  const newSale = new Sale(sale)

  // Save in DB
  await newSale.save()
  await updateSaleStock(sale.productId, sale.units);
  

  res.json({
    msg: "Sale saved",
    sale
  })
}

// const productsPut = async(req, res = response) => {

//   const { id } = req.params

//   const { _id, state, ...rest } = req.body //exclude status and _id & modify the ...rest data

//   const productDB = await Product.findByIdAndUpdate(id, rest) //update the data (...rest) that have the same id

//   res.json({
//     msg: "get put - controller",
//     productDB
//   })
// }

// const productsDelete = async(req, res = response) => {

//   const { id } = req.params

//   const product = await Product.findByIdAndDelete(id)

//   res.json({
//     product
//   })
// }

// const productExists = async(req, res = response) => {

//   const { id } = req.params
  
//   // Verify if product exists
//   const product = await Product.findById( id )
//   if(!product){
//     return res.status(200).json({
//       msg: false
//     })
//   }

//   res.json({
//     msg: true
//   })
// }

module.exports = {
  salesGet,
  salesPost
}