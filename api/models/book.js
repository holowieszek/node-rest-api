const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    summary: { type: String, required: true },
    type: { type: String, required: true }
});

module.exports = mongoose.model('Book', bookSchema);