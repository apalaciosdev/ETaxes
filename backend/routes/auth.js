const { Router } = require('express')
const { check } = require('express-validator')


const { login, register } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validate-fields')

const router = Router()

router.post('/login', [
  check('mail', 'Valid mail is required.').isEmail(),
  check('password', 'Password is required.').not().isEmpty(),
  validateFields
],login)

router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('mail', 'Valid mail is required.').isEmail(),
  check('password', 'Password is required.').not().isEmpty(),
  validateFields
],register)



module.exports = router