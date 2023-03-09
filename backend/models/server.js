const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../db/config')
const { uploadFile } = require('../controllers/images')

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT

    //Paths
    this.usersPath = '/api/users'
    this.authPath = '/api/auth'
    this.productsPath = '/api/products'

    //DB Connection
    this.dbConnect()

    //Middlewares
    this.middlewares()

    //Routes
    this.routes()
  }

  async dbConnect(){
    await dbConnection()
    
    uploadFile().then(data => {
      console.log(data)
    })
  }


  middlewares() {
    //CORS
    this.app.use(cors())

    //Read & Parse body
    this.app.use(express.json())

    //public directory
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth'))
    this.app.use(this.usersPath, require('../routes/user'))
    this.app.use(this.productsPath, require('../routes/product'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port)
    })
  }

}


module.exports = Server