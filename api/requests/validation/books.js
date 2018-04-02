const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const multer = require('multer');

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
];

exports.storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, date + file.originalname);
    }
});

exports.fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
