const mongoose = require('mongoose');
const async = require('async');

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

exports.create_author = (req, res, next) => {
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

    const author = new Author({
        first_name: req.body.first_name,
        surname: req.body.surname,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death
    });


    Author.findByIdAndUpdate(req.params.authorId, { $set: author })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Author updated successfully'
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
        })
}

exports.delete_author = (req, res, next) => {
    Author.findByIdAndRemove(req.params.authorId)
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Author deleted successfully'
            })
        })
        .catch(err => {
            if(err.kind === "ObjectId") {
                res.status(500).json({
                    error: 'Couldn\'t find Object Id: ' + err.value
                })
            }
        });
}