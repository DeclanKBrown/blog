const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username })

      if (user === null) {
        return done(null, false, { message: 'Incorrect username' })
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password)
      user.password = undefined

      if (isPasswordMatch === false) {
        return done(null, false, { message: 'Incorrect password' })
      }

      return done(null, user)
    } catch (err) {
      console.log('err', err)
      return done(err)
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

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
      const oldUser = await User.findOne({ username: username }).exec()

      if (oldUser !== null) {
        return res.status(400).json({ message: 'user already exists' })
      }

      const encyptedPassword = await bcrypt.hash(password, 10)

      const user = new User({
        username: username,
        password: encyptedPassword,
      })

      user.save()

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      })

      const updatedUser = user.toObject()

      delete updatedUser.password

      return res.status(201).json({ token, ...updatedUser, message: 'Success' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error })
      next(error)
    }
  }),
]

exports.log_in = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'username and password are required.' })
  }

  passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      return next(err)
    }
    if (!user) {
      console.log(status)
      return res.status(404).json(info)
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    const updatedUser = user.toObject()

    delete updatedUser.password

    return res
      .status(201)
      .json({ token, user: updatedUser, message: 'Success' })
  })(req, res, next)
})

exports.log_out = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.json({ message: 'successfully logged out' })
  })
})
