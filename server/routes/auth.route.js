const router = require("express").Router();
const passport = require('passport');


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback après authentification
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);
