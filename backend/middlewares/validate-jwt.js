const { response } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')


const validateJWT = async( req, res = response, next ) => { //data from headers
  const token = req.header('x-token')  //personalized name

  if(!token){
    return res.status(401).json({
      msg: 'There is not a token in the request'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY) //verify token

    //chek if user have the correspond id and get data
    const user = await User.findById( uid )
    if(!user){
      return res.status(401).json({
        msg: 'Invalid token - user not exists in DB'
      })
    }

    // state of user is true (user exists)
    if(!user.state){
      return res.status(401).json({
        msg: 'Invalid token - user with false state'
      })
    }

    req.user = user

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Invalid token'
    })
  }

}

module.exports = {
  validateJWT
}
