const { response } = require("express") //this helps VSC for code snippets
const bcrypt = require('bcryptjs')
const User = require('../models/user')


/**
 * Retorna un listado con todos los usuarios (solo para funciones de admin)
 */
const usersGet = async(req, res = response) => {
  const { limit = 5, from = 0 } = req.query  // http://localhost:2022/api/users??limit=10&from=3

  const [ total, users ] = await Promise.all([
    User.countDocuments({state: true}), //total users
    User.find({state: true}) // only works on users that they status=true (that means the user exists). Fisically, we will not remove the users, only we will change they status to false.
    .skip(Number(from))
    .limit(Number(limit)) //convert string to number
  ])

  res.json({
    total,
    users
  })
}


/**
 * Obtiene la información de un usuario
 */
const getUserInfo = async(req, res = response) => {
  const { mail, password } = req.body
  const user = await User.find({mail})

  res.json(
    user
  )
} 


/**
 * Crea un nuevo usuario
 */
const usersPost = async(req, res = response) => {
  const { password } = req.body
  const user = new User(req.body)

  // Encrypt password
  const salt = bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(password, salt)

  // Save in DB
  await user.save()

  res.json({
    user
  })
}


/**
 * Modifica un usuario de la DB
 */
const usersPut = async(req, res = response) => {
  const { _id, password, google,...rest } = req.body //exclude password, google and mail & modify the ...rest data

  const userDB = await User.findByIdAndUpdate( req.body.uid, rest) //update the data (rest) that have the same id

  res.json({
    userDB
  })
}


const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controller",
  })
}


/**
 * Elimina un usuario de la DB
 */
const usersDelete = async(req, res = response) => {
  const { id } = req.params
  const user = await User.findByIdAndUpdate(id, { state: false })
  const authenticatedUser = req.user //user data from middleware validate-jwt.js


  res.json({
    user,
    //authenticatedUser
  })
}


module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
  getUserInfo
}
