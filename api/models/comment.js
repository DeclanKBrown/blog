const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
  message: { type: String, required: true, maxLength: 50 },
  post: { type: String, ref: 'Post', required: true },
  timestamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Comment', commentSchema)
