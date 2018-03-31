const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.handler = [
    body('first_name', 'First name must not be empty').isLength({ min: 1 }).trim(),
    body('surname', 'Surname must not be empty').isLength({ min: 1 }).trim(),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('surname').trim().escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),

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