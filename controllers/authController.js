const User = require("../models/User");
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');


// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  // PoSuSaRe is the secret key
  return jwt.sign({ id }, 'PoSuSaRe', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {res.render('signup', { title: 'Signup'});
}

module.exports.login_get = (req, res) => {res.render('login', { title: 'Login'});
}

module.exports.signup_post = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.create({ email, password, role });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password, role } = req.body;

    try {
      const user = await User.login(email, password, role);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

