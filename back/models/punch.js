const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const punchSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  active: Boolean
}
,{ timestamps: true })

punchSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

punchSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Punch', punchSchema)