const jwt = require('jsonwebtoken')
const User = require('../models/user')



const get_user_from_request = async (request) => {

  const decoded_token = jwt.verify(request.token, process.env.SECRET)
  if ( !request.token || !decoded_token.id ){
    return null
  }
  const current_user = await User.findById(decoded_token.id)
  return current_user
}

module.exports = { get_user_from_request }
