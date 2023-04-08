const Sale = require('../models/sales')
const Product = require('../models/product')
const Offer = require('../models/offers')


const salesGet = async(req, res = response) => {

  const sales = await Sale.find();
  res.json(sales);
}

const infoSalesGet = async(req, res = response) => {
  const { mail } = req.body
  console.log("----------------------" , mail)

  let salesArray = [];



  const productsArray = await Product.find({ user: mail })
  
  


  const salesCount = await Sale.countDocuments({ sellerMail: mail });
  const countUserProducts = await Product.countDocuments({ user: mail });

  // const bestSelling = await Product.countDocuments({ user: mail });
  await Sale.find({sellerMail: mail})
  .then(sales => {
    salesArray = sales;
  })



  const compras = await Sale.find({sellerMail: mail})
  // Utilizamos reduce() para agrupar la información por meses
// Utilizamos reduce() para agrupar la información por meses
const comprasPorMes = compras.reduce((acumulador, compra) => {
  // Obtenemos el mes de la fecha_compra
  const month = compra.purchaseDate.toLocaleString('es-ES', { month: 'long' });
  
  // Si el month no existe en el array acumulador, lo creamos
  if (!acumulador[month]) {
    acumulador[month] = { month: month, total: 0 };
  }
  
  // Sumamos el precio de la compra al total del month correspondiente
  acumulador[month].total += compra.price;
  
  // Retornamos el acumulador
  return acumulador;
}, {});

// Convertimos el objeto en un array
const comprasPorMesArray = Object.values(comprasPorMes);



  //BEST SELLING
  const productUnits = salesArray.reduce((acc, sale) => {
    if (acc[sale.productId]) {
      acc[sale.productId] += sale.units;
    } else {
      acc[sale.productId] = sale.units;
    }
    return acc;
  }, {});
  
  const maxUnits = Object.entries(productUnits).reduce((acc, [productId, units]) => {
    if (units > acc.units) {
      acc.productId = productId;
      acc.units = units;
    }
    return acc;
  }, { productId: '', units: 0 });
  


  const offers = await Offer.find({sellerMail: mail});

  
  res.json({
    "salesCount": salesCount,
    "countUserProducts": countUserProducts,
    "bestSeller": salesArray.length === 0 ? null : await getProductData(maxUnits.productId),
    "stockGraphData": productsArray,
    "totalSalesPerProduct": await getTotalSalesProducts(salesArray),
    "offers": offers,
    "sales": await Sale.find({sellerMail: mail}),
    "salesGraphic": comprasPorMesArray
  });
}






const getProductData = async (productId) => {
  return await Product.findById(productId);
}

const getTotalSalesProducts = async (salesArray, productId) => {

  const productUnits = salesArray.reduce((acc, sale) => {
    if (acc[sale.productId]) {
      acc[sale.productId] += sale.units;
    } else {
      acc[sale.productId] = sale.units;
    }
    return acc;
  }, {});
  
  return productUnits;
}




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

const getSeller = async (id) => {
  // Find sale by ID
  const sale = await Product.findById(id);

  if (sale) {
    return sale.user;
  }
  return null;
};


const getProductsCount = async (req, res = response) => {
  const { mail } = req.body
  try {
    const numeroDeProductos = await Product.countDocuments({ user: { $eq: mail } });
    res.status(200).json( numeroDeProductos );
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al contar productos' });
  }
};


const salesPost = async(req, res = response) => {
  const sale = req.body
  sale.sellerMail = await getSeller(sale.productId);

  const check = await Product.findById(sale.productId);
  if(check.stock - sale.units >= 0){
    await updateSaleStock(sale.productId, sale.units);
    
    // Save in DB
    const newSale = new Sale(sale)
    await newSale.save()
  
    res.json({
      msg: "Sale saved",
      sale
    })
  }
  else{
    res.json({
      msg: "Stock negativo",
      sale
    })

  }

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
  salesPost,
  infoSalesGet,
  getProductsCount
}