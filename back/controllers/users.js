/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt')
const moment = require('moment')
const userRouter = require('express').Router()
const { request, response } = require('express')
const User = require('../models/user')
const Punch = require('../models/punch')


userRouter.post('/api/users', async (request, response) => {
  const data = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(data.password, saltRounds)

  const user = new User({
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    passwordHash,
    is_admin: false
  })

  const createdUser = await user.save()
  response.status(201).json({ message: 'ok' })
})

const get_total_hours = async (id) => {
  let hours = 0
  // Get all punches and calculate sum of hours
  const punches = await Punch.find({ user:id })
  console.log('punches',punches.length)

  punches.forEach(punch => {
    const curr_hours = Number(punch.updatedAt
      ? moment(punch.updatedAt).diff(moment(punch.createdAt), 'hours', true).toFixed(2)
      : moment().diff(moment(punch.updatedAt), 'hours', true).toFixed(2))

    console.log(moment(punch.updatedAt))
    console.log(moment(punch.createdAt))
    hours += curr_hours
  })

  return hours
}


userRouter.get('/api/users', async (request, response) => {
  const allUsers = await User.find({}).populate('jobs',{ title:1 })

  const users = []

  for(let i =0; i< allUsers.length; i++){
    let curr_user = allUsers[i]

    const total_hours = await get_total_hours(curr_user.id)

    users.push({
      ...curr_user._doc,
      total_hours
    })
  }

  response.status(200).json(users)
})


userRouter.patch('/api/admin/toggle/:user_id', async (request, response) => {
  const user_id = request.params.user_id
  const user = await User.findById(user_id)

  user.is_admin = !user.is_admin
  await user.save()

  response.status(204).json({})

})

module.exports = userRouter
