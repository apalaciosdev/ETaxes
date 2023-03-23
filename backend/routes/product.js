const { Router } = require('express')
const { check } = require('express-validator')

//middlewares
const { validateFields, validateJWT, haveRole, isAdminRole, isSalesRole } = require('../middlewares/index')

const { productsGet, productGet, productsPost, productsPut, productsDelete, productExists, userProducts, checkUserHaveProduct } = require('../controllers/products')
const { productExistsById, isRoleValid, userExistsById } = require('../helpers/db-validators')

const router = Router()

router.get('/', productsGet)

router.post('/userProducts', userProducts)

router.post('/checkUserHaveProduct', checkUserHaveProduct, [
  check('id', 'This is not a valid ID').isMongoId()
])

router.get('/product/:id', [
  // check('id', 'This is not a valid ID').isMongoId(),
  // check('id', 'ID is required').not().isEmpty(),
  // validateFields
], productGet)

router.post('/', [
  // validateJWT,
  // isSalesRole, //check if role of the user is ADMIN_ROLE or SALES_ROLE //send token
  check('title', 'Title of the product is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  // validateFields
], productsPost)

router.post('/:id', [
  check('id', 'This is not a valid ID').isMongoId(),
  check('id', 'ID is required').not().isEmpty(),
  validateFields
], productExists)


router.put('/:id',[
  // validateJWT,
  // isSalesRole, //check if role of the user is ADMIN_ROLE //send token
  // check('id', 'This is not a valid Id').isMongoId(),
  // validateFields
], productsPut)


router.delete('/:id', [
  // validateJWT,
  // isSalesRole,
  // //haveRole('ADMIN_ROLE', 'SALES_ROLE'), //required one of these roles
  check('id', 'This is not a valid ID').isMongoId(),
  check('id').custom(productExistsById),
  // validateFields
], productsDelete)


module.exports = router