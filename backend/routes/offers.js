const { Router } = require('express')
const { check } = require('express-validator')

//middlewares
const { validateFields, validateJWT, haveRole, isAdminRole, isSalesRole } = require('../middlewares/index')

const { offersGet, offerPost } = require('../controllers/offers')
const { productExistsById, isRoleValid, userExistsById } = require('../helpers/db-validators')

const router = Router()

router.get('/', offersGet)
router.post('/', offerPost)
// router.post('/salesData', infoSalesGet)

// router.post('/', salesPost)

module.exports = router