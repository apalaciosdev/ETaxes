const { Router } = require('express')
const { check } = require('express-validator')

//middlewares
const { validateFields, validateJWT, haveRole, isAdminRole, isSalesRole } = require('../middlewares/index')

const { salesGet, salesPost, infoSalesGet, getProductsCount } = require('../controllers/sales')
const { productExistsById, isRoleValid, userExistsById } = require('../helpers/db-validators')

const router = Router()

router.get('/', salesGet)
router.post('/salesData', infoSalesGet)
router.post('/countProducts', getProductsCount)

router.post('/', salesPost)

module.exports = router