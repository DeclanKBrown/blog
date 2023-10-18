const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

const Comment = require('../models/comment')

exports.comments = asyncHandler(async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .sort({ timestamp: 1 })
      .exec()

    return res.status(200).json({ message: comments })
  } catch (err) {
    console.log(err)
    res.send(500).json({ erros: err })
    return next(err)
  }
})

exports.create_comment = asyncHandler(async (req, res, next) => {
  const { message } = req.body
  const postID = req.params.id

  if (!message) {
    return res.status(403).json({ message: 'comment is required' })
  }

  try {
    const comment = new Comment({
      message: message,
      post: postID,
    })

    comment.save()

    return res.status(200).json({ message: 'Success' })
  } catch (err) {
    console.log(err)
    res.send(500).json({ erros: err })
    return next(err)
  }
})
