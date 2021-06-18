const Sequelize = require('sequelize');
const database = require('../config/db');
 
const Users = database.define('users', {
    name: { type: Sequelize.STRING },
    email: { 
        type: Sequelize.STRING, 
        unique: true, 
        allowNull: false 
    },
    phone: { type: Sequelize.STRING(15) },
    cpf: { type: Sequelize.STRING(14) },
    cep: { type: Sequelize.STRING(9) },
    localidade: { type: Sequelize.STRING() },
    uf: { type: Sequelize.STRING(2) },
    bairro: { type: Sequelize.STRING() },
    logradouro: { type: Sequelize.STRING() },
    number: { type: Sequelize.STRING(5) }
}, 
{
    timestamps: false,
})

Users.associate = models => { 
    User.hasMany(models.AuthToken); 
};
 
module.exports = Users;