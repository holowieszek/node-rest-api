const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: { type: String, required: true },
    surname: { type: String, required: true },
    date_of_birth: { type: Date },
    date_of_death: { type: Date }
});

module.exports = mongoose.model('Author', authorSchema);