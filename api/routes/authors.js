const express = require('express');
const router = express.Router();

const request = require('../requests/validation/authors');

const authorsController = require('../controllers/authorsController');

router.get('/', authorsController.get_authors);

router.post('/', request.handler, authorsController.create_author);

router.get('/:authorId', authorsController.show_author);

router.patch('/:authorId', request.handler, authorsController.update_author);

router.delete('/:authorId', authorsController.delete_author);

module.exports = router;