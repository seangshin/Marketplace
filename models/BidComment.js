const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class BidComment extends Model {}

BidComment.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bid_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'bid',
        key: 'id',
      },
    },
    comment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'comment',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bid_comment',
  }
);

module.exports = BidComment;
