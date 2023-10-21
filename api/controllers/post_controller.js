const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

const Post = require('../models/post')

exports.posts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ timestamp: 1 }).exec()

    return res.status(200).json({ posts: posts })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
    return next(err)
  }
})

exports.post = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findOne({ id: req.body.id })

    return res.status(200).json({ post: post })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
    return next(err)
  }
})

exports.create_post = [
  body('title').trim(),
  body('text').trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    if (errors.array().length > 1) {
      return res.status(405).json({ errors: errors.array() })
    }

    const { title, text } = req.body

    if (!title || !text) {
      return res.status(403).json({ message: 'title and text are required' })
    }

    try {
      const post = new Post({
        title: title,
        text: text,
      })

      post.save()

      return res.status(200).json({ message: 'Post created successfully' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
      return next(err)
    }
  }),
]

exports.delete_post = asyncHandler(async (req, res, next) => {
  try {
    await Post.findByIdAndRemove(req.params.id).exec()

    return res.status(200).json({ message: 'Succesfully deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: error })
    return next(err)
  }
})

exports.update_post = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  try {
    await Post.findByIdAndUpdate(req.body.id, {
      published: req.body.published,
    })

    return res.status(200).json({ message: 'Succesfully updated' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
    return next(err)
  }
})
