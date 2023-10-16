const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const { passwordCompare } = require('../utils/auth')
const user = require('../models/user')

exports.sign_up = [
  body('username').trim().isLength({ min: 6, max: 12 }).escape(),
  body('password').trim().isLength({ min: 8 }).escape(),
  body('confirmPassword').trim().isLength({ min: 8 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    const { username, password, confirmPassword } = req.body

    if (!req.body.username || !req.body.password || !req.body.confirmPassword) {
      return res.status(400).json({ message: 'all fields are required' })
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ message: 'passwords do not match' })
    }

    try {
      const oldUser = User.find({ username: username })

      if (typeof oldUser !== undefined) {
        return res.status(400).json({ message: 'user already exists' })
      }

      const encyptedPassword = await bcrypt.hash(password, 10)

      const user = new User({
        username: username,
        password: password,
      })

      user.save()

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' })

      const updatedUser = user.toObject()

      delete updatedUser.password

      return res.status(201).json({ token, ...updatedUser })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error })
      next(error)
    }
  }),
]
