var express = require('express');
var router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcrypt');
const saltRound = 10;
const isLoggedIn = require('../middleware/isLoggedIn');



// signup
router.post('/signup', (req, res, next) => {

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({error: "Username and password are requiered"});
    return;
  }

  User.findOne({ username })
      .then((user) => {
          if (user) {
            res.status(400).json({ message: "User already exists." });
            return;
          }

          const salt = bcrypt.genSaltSync(saltRound);
          const hashPassword = bcrypt.hashSync(password, salt);

          User.create({ username, password: hashPassword })
          .then(() => 
            res.status(204).json({ message: 'User created succesfully'}))
          .catch(err => 
            res.status(400).json({ message: 'Unable to create user, error: ' + err}));
      })
      .catch((error) => next(error));
});

// login
router.post('/login', (req, res, next) => {

  const { username, password } = req.body;

  if (!username || !password) {
      res.status(400).json({ message: "Username and password are requiered" });
      return;
  }

  User.findOne({ username })
  .then((user) => {
      if (!user) {
          res.status(400).json({ message: "Incorrect user or password" });
      }
      
      const passwordCorrect = bcrypt.compareSync(password, user.password);

      if (passwordCorrect) {
          req.session.currentUser = user;
          res.status(200).json(user)
      } else {
          res.status(400).json({ message: "Incorrect email or password" });
      }
  })
  .catch(err => console.log(err));
});

// logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) res.redirect('/');
      else res.send({message: 'logout succesful'});
  });
});

router.get('/user', isLoggedIn, (req,res, next) => {
  console.log('current user: ', req.session.currentUser);
  res.status(200).json(req.session.currentUser);
})

module.exports = router;
