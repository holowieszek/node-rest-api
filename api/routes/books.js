const express = require('express');
const router = express.Router();
const multer = require('multer');

const booksController = require('../controllers/booksController');
const request = require('../requests/validation/books');
const checkAuth = require('../middleware/checkAuth');


const upload = multer({ 
    storage: request.storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: request.fileFilter
});

router.get('/', booksController.get_books);

router.post('/', checkAuth, upload.single('bookImage'), request.handler, booksController.create_book);

router.get('/:bookId', booksController.show_book);

router.patch('/:bookId', checkAuth, request.handler, booksController.update_book);

router.delete('/:bookId', checkAuth, booksController.delete_book);

module.exports = router;