const router = require('express').Router();
const { User, Bid, Comment } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const bidData = await Bid.findAll({
      include: [{ model: User }],
    });
    //Serialize data so the template can read it
    const bids = bidData.map((bid) => bid.get({ plain: true }));

    res.render('homepage', {
      bids,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bid/:id', async (req, res) => {
  try {
    const bidData = await Bid.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });

    const bid = bidData.get({ plain: true });


    //check if post belongs to user
    let match = false;
    if (req.session.user_id == bid.user_id) {
      match = true;
    }

    console.log(bid);
    // const commentData = await Comment.findAll({
    //   include: [{ model: User }, { model: Bid }],
    // });
    // //Serialize data so the template can read it
    // const comments = commentData.map((comment) => comment.get({ plain: true }));
    //console.log(comments);
    //
    // const filteredComments = comments.filter(comment => {
    //   return comment.bid_id == req.params.id;
    // });
    // console.log(filteredComments);

    res.render('bid', { 
      ...bid,
      ...filteredComments,
      logged_in: req.session.logged_in,
      match
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/register', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register');
});

router.get('/profile', (req, res) => {

  res.render('profile');
});

module.exports = router;