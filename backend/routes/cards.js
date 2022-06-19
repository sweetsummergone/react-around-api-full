/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { celebrate } = require('celebrate');

const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { validatedCreateCardSchema, validatedDeleteCardSchema } = require('../utils/validations');

router.get('/', getCards);
router.post('/', celebrate(validatedCreateCardSchema), createCard);
router.delete('/:cardId', celebrate(validatedDeleteCardSchema), deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
