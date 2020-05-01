const { body } = require('express-validator');

String.prototype.isAlphaNumeric = function () {
  var regExp = /^[A-Za-z0-9]+$/;
  return this.match(regExp);
};

module.exports.validatePost = [
  body('title', 'Please enter a title').not().isEmpty(),
  body('body', 'Please enter a post body').not().isEmpty(),
  body('tags', 'Tags must be alphanumeric')
    .if(body('tags').not().isEmpty())
    .custom((value) => {
      return !value.split(',').some((str) => !str.trim().isAlphaNumeric());
    })
];
