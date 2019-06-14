const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check')


router.post('/', [
  check('name', 'Name is required')
  .not()
  .isEmpty(),
  check('email', 'Please include a valid e mail')
  .isEmail(),
  check('password', 'Please enter a password with 6 or more characters')
  .isLength({ min: 6 })
], (req,res) => {
  console.log(req.body)
  res.send('User route')
});

module.exports = router;