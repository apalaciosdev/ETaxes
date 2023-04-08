const jwt = require('jsonwebtoken')

const generateJWT = ( uid = '' ) => {

  return new Promise( (resolve, reject) => {

    const payload = { uid }

    // Generate JWT
    jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {

    }, (err, token) => {

      if(err){
        console.log(err)
        reject('Could not generate Token')
      }

      else{
        resolve(token)
      }
    })
  })
}

module.exports = {
  generateJWT
}