/* eslint-disable no-unused-vars */
const punchRouter = require('express').Router()
const { request, response } = require('express')
const Job = require('../models/job')
const Punch = require('../models/punch')
const { get_user_from_request } = require('./utils')


punchRouter.post('/api/punch-in/:job_id', async (request, response) => {
  // Create a new punch

  const curr_job_id = request.params.job_id

  const curr_user = await get_user_from_request(request)
  if (!curr_user) return response.status(401).json({ error:'missing or invalid token' })

  const curr_job = await Job.findById(curr_job_id)

  const new_punch = new Punch({
    job: curr_job,
    user: curr_user,
    active: true
  })
  await new_punch.save()
  curr_job.punches.push(new_punch)
  curr_job.punched_in = true
  await curr_job.save()

  response.status(201).json({ message: 'created' })
})

punchRouter.patch('/api/punch-out/:job_id', async (request, response) => {

  const curr_job_id = request.params.job_id

  const curr_user = await get_user_from_request(request)
  if (!curr_user) return response.status(401).json({ error:'missing or invalid token' })

  const curr_job = await Job.findById(curr_job_id)
  curr_job.punched_in = false
  await curr_job.save()

  const curr_punch = await Punch.findOne({
    job: curr_job,
    active: true
  })

  // To punch out, just set active to false
  curr_punch.active = false
  await curr_punch.save()



  response.status(204).json({ message: 'ok' })
})

module.exports = punchRouter
