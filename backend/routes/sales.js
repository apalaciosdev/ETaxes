const { Router } = require('express')
const { check } = require('express-validator')

//middlewares
const { validateFields, validateJWT, haveRole, isAdminRole, isSalesRole } = require('../middlewares/index')

const { salesGet, salesPost, infoSalesGet } = require('../controllers/sales')
const { productExistsById, isRoleValid, userExistsById } = require('../helpers/db-validators')

const router = Router()

router.get('/', salesGet)

router.post('/salesData', [
  // validateJWT,
], infoSalesGet)



router.post('/', [
  validateJWT
], salesPost)

module.exports = router