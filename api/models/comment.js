const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
  message: { type: String, required: true, maxLength: 50 },
  user: { type: String, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Comment', commentSchema)
