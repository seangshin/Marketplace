//import models
const User = require('./User');
const Bid = require('./Bid');

//association methods for the Sequelize models to create relationships between them
//A user can have many Bids
User.hasMany(Bid, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  //A bid belongs to a single user
  Bid.belongsTo(User, {
    foreignKey: 'user_id',
  });

  module.exports = { User, Bid };