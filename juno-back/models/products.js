const Sequelize = require('sequelize');
const database = require('../config/db');
 
const Products = database.define('products', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT('long'),
    price: Sequelize.DOUBLE(10, 2)
}, {
    timestamps: false,
})

module.exports = Products;