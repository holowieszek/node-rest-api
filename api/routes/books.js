const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');

router.get('/', booksController.get_books);

router.post('/', booksController.create_book);

router.get('/:bookId', booksController.show_book);

router.patch('/:bookId', booksController.update_book);

router.delete('/:bookId', booksController.delete_book);

module.exports = router;