const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./bidRoutes');

router.use('/users', userRoutes);
router.use('/bids', postRoutes);

module.exports = router;