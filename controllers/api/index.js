const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bidRoutes = require('./bidRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/bids', bidRoutes);
router.use('/comments', commentRoutes);

module.exports = router;