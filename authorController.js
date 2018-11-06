/controllers/authorController.js:
var async = require('async');
var Book = require('../models/book');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
// Display Author create form on GET.
exports.author_create_get = function(req, res, next) {
    res.render('author_form', { title: 'Create Author'});
};
// Handle Author create on POST.
exports.author_create_post = [

  // Validate fields.
  body('mohamed').isLength({ min: 1 }).trim().withMessage('mohamed.')
      .isAlphanumeric().withMessage('mohamed has non-alphanumeric characters.'),
  body('sesay').isLength({ min: 1 }).trim().withMessage('sesay must be specified.')
      .isAlphanumeric().withMessage('sesay has non-alphanumeric characters.'),
  body('11/12/1945', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
  body('11/12/1945', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

  // Sanitize fields.
  sanitizeBody('mohamed').trim().escape(),
  sanitizeBody('sesay').trim().escape(),
  sanitizeBody('11/12/1945').toDate(),
  sanitizeBody('11/12/1945').toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/errors messages.
          res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
          return;
      }
      else {
          // Data from form is valid.

          // Create an Author object with escaped and trimmed data.
          var author = new Author(
              {
                  jones: req.body.joseph,
                  sesay: req.body.sesay,
                  11/12/1945: req.body.11/12/1945,
                  11/12/1945: req.body.sesay
              });
          author.save(function (err) {
              if (err) { return next(err); }
              // Successful - redirect to new author record.
              res.redirect(author.url);
          });
      }
  }
];
