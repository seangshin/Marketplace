# marketplace

 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
 ![](/screenshot.JPG)
 
Link to deployed application: https://safe-harbor-99168.herokuapp.com/

## Description
The motivation of this project is to build a Content Management System (CMS) e-commerce site, where users can post items for sale and other users can place bids on the item. The user can specify when the post expires to secure the highest bidder and proceed with item transactions. The application follows the Model View Controller (MVC) architecture and uses Node.js & Express.js to create a RESTful API. It uses Handlebars.js as the template engine, MySQL as the relational database management system, and Sequelize as the Object Relational Mapper (ORM). It also uses the express-session npm package for authentication and the nodemailer npm package for website notifications via email. The application supports user registration and authentication features by storing user session data as a cookie and implementing packages such as brypt and dotenv to protect API keys and sensitive information with environment variables.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributions](#contributions)
- [Tests](#tests)
- [Questions](#questions)
  
## Installation
The following tools were used for development and testing of this project: Code development IDE (Microsoft VS Code), node.js (JavaScript runtime environment), npm (software registry containing inquirer).

The following npm packages are required:
* mysql2 ^2.2.5
* bcrypt ^5.0.0
* connect-session-sequelize ^7.0.4
* dotenv ^8.2.0
* express ^4.18.2
* express-handlebars ^5.2.0
* express-session ^1.17.1
* moment ^2.29.4
* nodemailer ^6.8.0
* sequelize ^6.3.5
  
## Usage
The application is deployed to heroku via the following link: https://safe-harbor-99168.herokuapp.com/
  
## Credits
Georgia Tech Coding Bootcamp instructors, TA's, and other faculty.

## License
MIT

## Contributions
seangshin, victor5055, JaredW1911

## Tests
For development, the application requires the heroku CLI to seed the database when the application is first deployed. Run the following commands in the terminal:
>heroku run bash
~ $ npm run seed
  
## Questions
GitHub URL: https://github.com/seangshin, https://github.com/victor5055, https://github.com/JaredW1911
Reach our team with additional questions at shin.seang@gmail.com, victor5055@outlook.com, jaredwilliams1019@gmail.com
