const { response } = require("express") //this helps VSC for code snippets
const bcrypt = require('bcryptjs')
const User = require('../models/user')


const usersGet = async(req, res = response) => {

  /* const users = await User.find({state: true}) // only works on users that they status=true (that means the user exists). Fisically, we will not remove the users, only we will change they status to false.
  .skip(Number(from))
  .limit(Number(limit)) //convert string to number

  const total = await User.countDocuments({state: true}) //total users*/

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


const usersPost = async(req, res = response) => {

  const { name, mail, password, role } = req.body
  const user = new User({ name, mail, password, role })

  // Encrypt password
  const salt = bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(password, salt)

  // Save in DB
  await user.save()

  res.json({
    user
  })
}


const usersPut = async(req, res = response) => {

  //const id = req.params.id    //ex: http://localhost:2022/api/users/10   ->  id = 10
  const { id } = req.params
  const { _id, password, google, mail,...rest } = req.body //exclude password, google and mail & modify the ...rest data

  if(password){
    // Encrypt password
    const salt = bcrypt.genSaltSync()
    rest.password = bcrypt.hashSync(password, salt)
  }

  const userDB = await User.findByIdAndUpdate( id, rest) //update the data (rest) that have the same id

  res.json({
    userDB
  })
}


const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controller",
  })
}


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
}
