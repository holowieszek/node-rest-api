const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length >= 1) {
                res.status(200).json({
                    message: 'This user exists'
                });
            };

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    res.status(500).json({
                        error: err
                    });
                };

                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                });

                user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            error: 'User created'
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length < 1) {
                res.status(500).json({
                    error: 'This user doesn\'t exists!'
                })
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(500).json({
                        message: 'Auth failed',
                        error: err
                    })
                };

                if(result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );

                    return res.status(201).json({
                        message: 'Auth successfull',
                        token: token
                    })
                }
                
                res.status(500).json({
                    message: 'Auth failed'
                });
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}