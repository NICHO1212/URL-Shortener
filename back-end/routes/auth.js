const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {loginValidation} = require('../validation');
/*
const {registerValidation} = require('../validation');

//REGISTER
router.post('/register', async (req, res) => {
  const {error} = registerValidation(req.body);
  if (error) { return res.status(400).send(error.details[0].message); }
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);
  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    return res.status(200).send({user_id: savedUser._id});
  } catch (err) {
    if (err.keyValue.email) { return res.status(400).send('Email already exists!'); }
    return res.status(400).send('Oops! Something went wrong');
  };
});
*/

//LOGIN
router.post('/login', async (req, res) => {
  const {error} = loginValidation(req.body);
  if (error) { return res.status(400).send(error.details[0].message); }
  const user = await User.findOne({username: req.body.username});
  if (!user) { return res.status(400).send('The email or the password is incorrect!'); }
  const validPassword = await bcryptjs.compare(req.body.password, user.password)
  if (!validPassword) { return res.status(400).send('The email or the password is incorrect!'); }
  const token = jwt.sign({_id: user._id}, process.env.JWT);
  return res.header('jwt', token).status(200).send({user_id: user._id});
});

module.exports = router;