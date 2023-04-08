const { Router } = require('express')
const { check } = require('express-validator')

//middlewares
const { validateFields, validateJWT, haveRole, isAdminRole, isSalesRole } = require('../middlewares/index')

const { offersGet, offerPost, deleteOffer, activateOffer } = require('../controllers/offers')
const { productExistsById, isRoleValid, userExistsById } = require('../helpers/db-validators')

const router = Router()

router.get('/', offersGet)
router.post('/', offerPost)
router.delete('/:id', deleteOffer)
router.post('/activate/:id', activateOffer)
// router.post('/salesData', infoSalesGet)

// router.post('/', salesPost)

module.exports = router