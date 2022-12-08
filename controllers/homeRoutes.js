const router = require('express').Router();
const { User, Bid } = require('../models');
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

module.exports = router;