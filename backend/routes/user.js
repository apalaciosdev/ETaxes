const { Router } = require('express')
const { check } = require('express-validator')

//middlewares
const { validateFields, validateJWT, haveRole, isAdminRole } = require('../middlewares/index')

const { isRoleValid, mailExists, userExistsById } = require('../helpers/db-validators')
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/user')
const router = Router()


router.get('/', [
  validateJWT,
  isAdminRole, //check if role of the user is ADMIN_ROLE //send token
],usersGet)

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password must have more than 6 characters').isLength({min: 6}),
  check('mail', 'Mail is not valid').isEmail(),
  check('mail').custom(mailExists),
  // check('role', 'Role not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(isRoleValid),
  validateFields
], usersPost)


router.put('/:id',[
  check('id', 'This is not a valid Id').isMongoId(),
  check('id').custom(userExistsById),
  check('role').custom(isRoleValid),
  validateFields
],usersPut)

router.patch('/', usersPatch)

router.delete('/:id', [
  validateJWT,
  //isAdminRole //only when admin is required for do the task,
  haveRole('ADMIN_ROLE', 'SALES_ROLE'), //required one of these roles
  check('id', 'This is not a valid ID').isMongoId(),
  check('id').custom(userExistsById),
  validateFields
], usersDelete)


module.exports = router