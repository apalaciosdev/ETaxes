const Product = require('../models/product')
const Role = require('../models/role')
const User = require('../models/user')

const isRoleValid = async(role = '') => {
  const roleExists = await Role.findOne({ role })
  if(!roleExists){
    throw new Error(`Role ${role} is not registered in DB`)
  }
}

const mailExists = async(mail = '') => {
  const exists = await User.findOne({ mail }) //validate if mail exists in DB
  if(exists){
    throw new Error(`Mail ${mail} is already registered`)
  }
}

const userExistsById = async(id) => {
  const userExists = await User.findById( id )
  if(!userExists){
    throw new Error(`Id ${id} doesn't exists`)
  }
}

const productExistsById = async(id) => {
  const productExists = await Product.findById( id )
  if(!productExists){
    throw new Error(`Id ${id} doesn't exists`)
  }
}

module.exports = {
  isRoleValid,
  mailExists,
  userExistsById,
  productExistsById
}