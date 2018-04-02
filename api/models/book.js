const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    summary: { type: String, required: true },
    type: { type: String, required: true },
    bookImage: { type: String, required: true }
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

bookSchema
    .virtual('url')
    .get(function() {
        return '/books/' + this._id
    });

module.exports = mongoose.model('Book', bookSchema);