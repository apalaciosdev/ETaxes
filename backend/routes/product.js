const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

//middlewares
const { validateFields, validateJWT, haveRole, isAdminRole, isSalesRole } = require('../middlewares/index')

const { productsGet, productGet, productsPost, productsPut, productsDelete, productExists, getProductsCount, userProducts, checkUserHaveProduct } = require('../controllers/products')
const { productExistsById, isRoleValid, userExistsById } = require('../helpers/db-validators')


router.get('/', productsGet)

router.post('/userProducts', [
  validateJWT
], userProducts)

router.post('/checkUserHaveProduct', checkUserHaveProduct, [
  check('id', 'This is not a valid ID').isMongoId()
])

router.post('/countProducts', [
  // validateJWT
], getProductsCount)

router.get('/product/:id', [
], productGet)

router.post('/', [
  validateJWT,
  check('title', 'Title of the product is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
], productsPost)

router.post('/:id', [
  check('id', 'This is not a valid ID').isMongoId(),
  check('id', 'ID is required').not().isEmpty(),
  validateFields
], productExists)


router.put('/:id',[
  validateJWT,
], productsPut)


router.delete('/:id', [
  validateJWT,
  check('id', 'This is not a valid ID').isMongoId(),
  check('id').custom(productExistsById),
], productsDelete)


module.exports = router