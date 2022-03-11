const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('mongoose-type-email')

const jobSchema = new mongoose.Schema({
  title: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  punches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Punch'
    }
  ],
  punched_in: Boolean
}
,{ timestamps: true })

jobSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


jobSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Job', jobSchema)