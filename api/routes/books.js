const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');
const request = require('../requests/validation/books');

router.get('/', booksController.get_books);

router.post('/', request.handler, booksController.create_book);

router.get('/:bookId', booksController.show_book);

router.patch('/:bookId', request.handler, booksController.update_book);

router.delete('/:bookId', booksController.delete_book);

module.exports = router;