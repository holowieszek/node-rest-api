const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authorsController');

router.get('/', authorsController.get_authors);

router.post('/', authorsController.create_author);

router.get('/:authorId', authorsController.show_author);

router.patch('/:authorId', authorsController.update_author);

// router.delete('/:authorId', authorsController.delete_author);

module.exports = router;