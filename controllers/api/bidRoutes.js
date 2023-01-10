const router = require('express').Router();
const { Bid, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBid = await Bid.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBid);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;