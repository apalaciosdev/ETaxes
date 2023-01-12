const {Schema, model} = require('mongoose')

const RoleSchema = Schema({
  role:{
    type: String,
    required: [true, 'Role is required']
  }
})

module.exports = model('Role', RoleSchema)



/*
  In DB, we have to create a new collection called "roles" where we have to put the user's roles.
  {
    {
      "role": "USER_ROLE"
    },
    {
      "role": "ADMIN_ROLE"
    },
    {
      "role": "SALES_ROLE"
    }
  }
*/