const express = require('express');
const userRoutes = require('../../services/user/user.route');
const authRoutes = require('../../services/auth/auth.route');
const postRoutes = require('../../services/post/post.route')

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
// router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/post', postRoutes);

module.exports = router;
