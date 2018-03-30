const mongoose = require('mongoose');
const async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const Author = require('../models/author');
const Book = require('../models/book');

exports.get_authors = (req, res, next) => {
    Author.find()
        .exec()
        .then(result => {
            res.status(200).json({
                authors: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.create_author = [
    body('first_name', 'First name must not be empty').isLength({ min: 1 }).trim(),
    body('surname', 'Surname must not be empty').isLength({ min: 1 }).trim(),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('surname').trim().escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),


    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(500).json(errors.array())
        }

        const authorDetails = {
            first_name: req.body.first_name,
            surname: req.body.surname,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        };

        const author = new Author({
            _id: new mongoose.Types.ObjectId(),
            ...authorDetails
        });
        
        author.save()
            .then(result => {
                res.status(201).json({
                    message: 'Author created successfully',
                    author_details: {
                        _id: result._id,
                        ...authorDetails,
                    }
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }
];

exports.show_author = (req, res, next) => {
    async.parallel({
        author: (callback) => {
            Author.findById(req.params.authorId, '_id first_name surname date_of_birth date_of_death')
                .exec(callback)
        },
        author_books: (callback) => {
            Book.find({ 'author': req.params.authorId }, '_id title author summary type')
                .exec(callback)
        }
    }, (err, results) => {
        if(err) {
            res.status(500).json({
                error: err
            });
        }

        if(results.author === null) {
            res.status(200).json({
                message: 'Author not found!'
            })
        }
        res.status(200).json(results)
    })
}

exports.update_author = (req, res, next) => {

}

exports.delete_author = (req, res, next) => {

}