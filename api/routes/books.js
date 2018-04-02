const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');
const request = require('../requests/validation/books');
const checkAuth = require('../middleware/checkAuth');

router.get('/', booksController.get_books);

router.post('/', checkAuth, request.handler, booksController.create_book);

router.get('/:bookId', booksController.show_book);

router.patch('/:bookId', checkAuth, request.handler, booksController.update_book);

router.delete('/:bookId', checkAuth, booksController.delete_book);

module.exports = router;