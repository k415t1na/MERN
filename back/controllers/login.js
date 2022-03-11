const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
// eslint-disable-next-line no-unused-vars
const { request, response } = require('express')
const User = require('../models/user')


loginRouter.post('/api/login', async (request, response) => {
  const body = request.body

  // Finds the user in the database
  const user = await User.findOne({ email: body.email })
  // Checks if password is correct
  const passCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if(! (user && passCorrect) ){
    return response.status(401).json({
      error: 'invalid email or password'
    })
  }
  const userForToken = {
    email: user.email,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, email: user.email, first_name: user.first_name })

})


module.exports = loginRouter

