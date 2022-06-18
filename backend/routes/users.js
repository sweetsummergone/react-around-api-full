/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { getUsers, getUser, updateUser, updateAvatar } = require('../controllers/users');

// route definitions
router.get('/', getUsers);
router.get('/:userId', getUser);
router.get('/me', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
