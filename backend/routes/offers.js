const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

//middlewares
const { validateFields, validateJWT, haveRole, isAdminRole, isSalesRole } = require('../middlewares/index')

const { offersGet, offerPost, deleteOffer, activateOffer } = require('../controllers/offers')
const { productExistsById, isRoleValid, userExistsById } = require('../helpers/db-validators')


router.get('/', offersGet)
router.post('/', offerPost)
router.delete('/:id', deleteOffer)
router.post('/activate/:id', activateOffer)


module.exports = router