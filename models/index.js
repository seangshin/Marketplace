//import models
const User = require('./User');
const Bid = require('./Bid');
const Comment = require('./Comment');

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

  //A user can have many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//A comment belongs to a single user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

//A post can have many comments
Bid.hasMany(Comment, {
  foreignKey: 'bid_id',
  onDelete: 'CASCADE'
});

//A comment belongs to a single post
Comment.belongsTo(Bid, {
  foreignKey: 'bid_id',
});

  module.exports = { User, Bid , Comment};