//Dependencies
const express = require('express');
const path = require('path');
const routes = require('./controllers');

//Import express-handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const session = require('express-session');

//Set up for express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
};
app.use(session(sess));

// Inform Express.js to use Handlebars.js as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//import sequelize connection
const sequelize = require('./config/connection');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up for the routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log(`Sever listening on http://localhost:${PORT}`));
});