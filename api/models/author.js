const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: { type: String, required: true },
    surname: { type: String, required: true },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});


authorSchema
    .virtual('url')
    .get(function() {
        return '/authors/' + this._id
    });

module.exports = mongoose.model('Author', authorSchema);