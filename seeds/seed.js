const sequelize = require('../config/connection');
const { User, Bid } = require('../models');

//TO DO...rename to match application, review random generation functions
const userData = require('./userData.json');
const bidData = require('./bidData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const bid of bidData) {
    await Bid.create({
      ...bid,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();