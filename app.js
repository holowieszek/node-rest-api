const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const bookRoutes = require('./api/routes/books');
const authorRoutes = require('./api/routes/authors');
const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds137464.mlab.com:37464/node-rest-library');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;