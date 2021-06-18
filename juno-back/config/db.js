const Sequelize = require('sequelize');
const sequelize = new Sequelize('juno', 'root', '', {dialect: 'mysql', host: 'localhost'});
 
module.exports = sequelize;