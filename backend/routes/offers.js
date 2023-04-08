const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

//middlewares
const { validateFields, validateJWT, haveRole, isAdminRole, isSalesRole } = require('../middlewares/index')

const { offersGet, offerPost, deleteOffer, activateOffer } = require('../controllers/offers')
const { productExistsById, isRoleValid, userExistsById } = require('../helpers/db-validators')


router.get('/', [
  validateJWT
], offersGet)

router.post('/', [
  validateJWT
],offerPost)

router.delete('/:id', [
  validateJWT
], deleteOffer)

router.post('/activate/:id', [
  validateJWT
], activateOffer)


module.exports = router