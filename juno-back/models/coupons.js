const Sequelize = require('sequelize');
const database = require('../config/db');
 
const Coupons = database.define('coupons', {
    code: Sequelize.STRING,
    discount: Sequelize.INTEGER,
    qtd: Sequelize.INTEGER,
    valid: Sequelize.DATEONLY
}, {
    timestamps: false,
})

module.exports = Coupons;