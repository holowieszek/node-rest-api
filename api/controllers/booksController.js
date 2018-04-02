const mongoose = require('mongoose');
const async = require('async');

const Book = require('../models/book');

exports.get_books = (req, res) => {
    Book.find()
        .select('_id title author summary type bookImage')
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

exports.create_book = (req, res, next) => {
    const bookDetails = {
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        type: req.body.type
    }

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        bookImage: req.file.path,
        ...bookDetails
    });
    
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

exports.show_book = (req, res) => {
    Book.findById(req.params.bookId)
        .select('_id title author summary type bookImage')
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
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        type: req.body.type
    });

    Book.findByIdAndUpdate(req.params.bookId, { $set: book })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Book updated successfully!'
            })
        })
        .catch(err => {
            if(err.kind === "ObjectId") {
                res.status(500).json({
                    error: 'Couldn\'t find Object Id: ' + err.value
                })
            }
            res.status(500).json({
                error: err
            })
        });
};

exports.delete_book = (req, res, next) => {
    Book.findByIdAndRemove(req.params.authorId)
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Book deleted successfully'
            })
        })
        .catch(err => {
            if(err.kind === "ObjectId") {
                res.status(500).json({
                    error: 'Couldn\'t find Object Id: ' + err.value
                })
            }
        });
};
