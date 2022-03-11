/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const { request, response } = require('express')
const User = require('../models/user')


userRouter.post('/api/users', async (request, response) => {
  const data = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(data.password, saltRounds)

  const user = new User({
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    passwordHash,
  })

  const createdUser = await user.save()
  response.status(201).json({ message: 'ok' })
})

userRouter.get('/api/users', async (request, response) => {
  const allUsers = await User.find({}).populate('jobs',{ title:1 })
  response.status(200).json(allUsers)
})

module.exports = userRouter
