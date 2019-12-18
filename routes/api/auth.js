const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js')
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require('bcryptjs');

const User = require('../../models/User')


router.get('/', auth, async (req, res) => {
  try {
    //uses the auth with token to find the user's id in the request and return it in json without the password attached using the User model information
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});


//auth user and get the token
router.post(
  "/",
  [
    check("email", "Please include a valid e mail").isEmail(),
    check(
      "password",
      "Password is required"
    ).exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      //See if user exists, send error if they do.
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //match e mail and password. .compare method baked into bcrypt matches

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //return the json webtoken

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.err(err.message);
      res.status(500).send("Server error");
    }
  }
);


module.exports = router;