const { sequelize } = require('../config/connection');
const { User, Bid, Comment } = require('../models');

//TO DO...rename to match application, review random generation functions
const userData = require('./userData.json');
const bidData = require('./bidData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const bid of bidData) {
    await Bid.create({
      ...bid,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
      // bid_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();