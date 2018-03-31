const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.handler = [
    body('title', 'Title must not be empty').isLength({ min: 1 }).trim(),
    body('author', 'Author must not be empty').isLength({ min: 1 }).trim(),
    body('summary', 'Summary must not be empty').isLength({ min: 1 }).trim(),
    body('type', 'Type must not be empty').isLength({ min: 1 }).trim(),

    sanitizeBody('*').trim().escape(),

    (req, res, next) => {
        try {
            validationResult(req).throw();
            next();
        } catch (err) {
            res.status(422).json({ 
                errors: err.mapped()
            })
        }
    }
]
    