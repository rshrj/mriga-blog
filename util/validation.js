const { body } = require('express-validator');

module.exports.validatePost = [
  body('title', 'Please enter a title').not().isEmpty(),
  body('body', 'Please enter a post body').not().isEmpty(),
  body('tags', 'Tags must be alphanumeric')
    .if(body('tags').not().isEmpty())
    .isAlphanumeric()
];
