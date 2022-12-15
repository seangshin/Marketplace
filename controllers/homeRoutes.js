const router = require('express').Router();
const { User, Bid, Comment } = require('../models');
const moment = require('moment');
//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const bidData = await Bid.findAll({
      include: [{ model: User }],
    });
    //Serialize data so the template can read it
    const bids = bidData.map((bid) => bid.get({ plain: true }));
    
    //check if the bid is expired
    const now = moment().format('MM/DD/YYYY, HH:MM:SS');
    const bidsActive = bids.map((bid) => {
      const copy = { ...bid };
      var options = { hour12: false };
      if (bid.expiration_date.toLocaleString('en-US', options) < now) {
        copy.active = false;
      } else {
        copy.active = true;
      }
      return copy;
    });

    res.render('homepage', {
      bidsActive,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bid/:id', async (req, res) => {
  try {
    const bidData = await Bid.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment, include: [{ model: User }] } ],
    });

    const bid = bidData.get({ plain: true });

    //check if the bid is expired
    const now = moment().format('MM/DD/YYYY, HH:MM:SS');
    var options = { hour12: false };
    if (bid.expiration_date.toLocaleString('en-US', options) < now) {
      bid.active = false;
    } else {
      bid.active = true;
    }

    //check if post belongs to user
    let match = false;
    if (req.session.user_id == bid.user_id) {
      match = true;
    }

    res.render('bid', { 
      ...bid,
      logged_in: req.session.logged_in,
      match
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/register', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register');
});

router.get('/profile', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Bid }, {model: Comment}],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;