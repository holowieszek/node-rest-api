const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const bookRoutes = require('./api/routes/books');
const authorRoutes = require('./api/routes/authors');

mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds137464.mlab.com:37464/node-rest-library');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);


module.exports = app;