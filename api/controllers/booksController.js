const mongoose = require('mongoose');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const Book = require('../models/book');

exports.get_books = (req, res) => {
    Book.find()
        .select('_id title author summary type')
        .populate('author', '_id first_name surname date_of_birth date_of_death')
        .then(result => {
            res.status(200).json({
                books: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.create_book = [
    body('title', 'Title must not be empty').isLength({ min: 1 }).trim(),
    body('author', 'Author must not be empty').isLength({ min: 1 }).trim(),
    body('summary', 'Summary must not be empty').isLength({ min: 1 }).trim(),
    body('type', 'Type must not be empty').isLength({ min: 1 }).trim(),

    sanitizeBody('*').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const bookDetails = {
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            type: req.body.type
        }
        const book = new Book({
            _id: new mongoose.Types.ObjectId(),
            ...bookDetails
        });

        if(!errors.isEmpty()){
            res.status(200).json(errors.array());
        }
        
        book.save()
            .then(result => {
                res.status(201).json({
                    message: 'Book created successfully',
                    book_details: {
                        ...bookDetails
                    }
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }
]

exports.show_book = (req, res) => {
    Book.findById(req.params.bookId)
        .select('_id title author summary type')
        .then(result => {
            res.status(200).json({
                book: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.update_book = (req, res, next) => {
    const updateParams = [];
    for(const key of Object.keys(req.body)) {
        updateParams[key] = req.body[key];
    }

    Book.update({ _id: req.params.bookId }, { $set: updateParams })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Book updated successfully!',
            })
        })
        .catch(err => {
            res.status(500).json(err);
        })
};

exports.delete_book = (req, res, next) => {
    Book.remove({ _id: req.params.bookId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Book deleted successfully!'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};
