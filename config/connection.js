const Sequelize = require('sequelize');
const nodemailer = require('nodemailer');
//Enable acces to .env variables
require('dotenv').config();

//Create a connection object to interact with the database
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
  });

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASS,
  },
});

module.exports = { sequelize, transporter };