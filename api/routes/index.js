var express = require('express')
var router = express.Router()

const user_controller = require('../controllers/user_controller')
const post_controller = require('../controllers/post_controller')
const comment_controller = require('../controllers/comment_controller')

/// USER ROUTES ///
router.post('/api/v1/sign_up', user_controller.sign_up)

router.post('/api/v1/log_in', user_controller.log_in)

router.post('/api/v1/log_out', user_controller.log_out)

/// POST ROUTES ///
router.get('/api/v1/posts', post_controller.posts)

router.get('/api/v1/post/:id', post_controller.post)

router.post('/api/v1/post', post_controller.create_post)

router.delete('/api/v1/post/:id', post_controller.delete_post)

router.put('/api/v1/post/:id', post_controller.update_post)

/// COMMENT ROUTES ///
// router.get('/api/v1/post/:id/comments', comment_controller.comments)

// router.post('/api/v1/post/:id/comments', comment_controller.create_comment)

// router.delete('/api/v1/post/:id/comment/:id', comment_controller.delete_comment)

// router.put('/api/v1/post/:id/comment/:id', comment_controller.update_comment)

module.exports = router
