const { response } = require('express')


const isAdminRole = (req, res = response, next) => {

  if(!req.user){
    return res.status(500).json({
      msg: 'You want to verify the role without first validating token'
    })
  }

  const { role, name} = req.user

  if(role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: `User ${ name } dont have admin privileges`
    })
  }

  next()
}


const haveRole = ( ...roles ) => {

  return (req, res = response, next) => {

    //console.log(roles)
    //console.log(req.user.role)

    if(!req.user){
      return res.status(500).json({
        msg: 'You want to verify the role without first validating token'
      })
    }

    if(!roles.includes(req.user.role)){ //validate if exists role in DB
      return res.status(401).json({
        msg: `Service require one of these roles ${roles}`
      })
    }

    next()
  }
}



module.exports = {
  isAdminRole,
  haveRole,
}