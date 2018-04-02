const express = require('express');
const router = express.Router();

const request = require('../requests/validation/authors');
const authorsController = require('../controllers/authorsController');
const checkAuth = require('../middleware/checkAuth');

router.get('/', authorsController.get_authors);

router.post('/', checkAuth, request.handler, authorsController.create_author);

router.get('/:authorId', authorsController.show_author);

router.patch('/:authorId', checkAuth, request.handler, authorsController.update_author);

router.delete('/:authorId', checkAuth, authorsController.delete_author);

module.exports = router;