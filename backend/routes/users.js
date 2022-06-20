/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { celebrate } = require('celebrate');

const { getUsers, getUser, updateUser, updateAvatar } = require('../controllers/users');
const { validatedUpdateUserSchema, validatedUpdateAvatarUserSchema, validatedGetSpecifiedUserSchema } = require('../utils/validations');

// route definitions
router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', celebrate(validatedGetSpecifiedUserSchema), getUser);
router.patch('/me', celebrate(validatedUpdateUserSchema), updateUser);
router.patch('/me/avatar', celebrate(validatedUpdateAvatarUserSchema), updateAvatar);

module.exports = router;
