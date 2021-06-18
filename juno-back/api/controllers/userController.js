const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const Users = require('../../models/users')

exports.register = async (req, res) => {
    var user = await Users.findOne({ where: { email: req.body.email } })

    if(user) {
        user.update({
            name: req.body.name,
            phone: req.body.phone,
            cpf: req.body.cpf
        })
    }else {
        user = await Users.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            cpf: req.body.cpf
        })
    }

    const token = await jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email
    },
    config.get('jwt_key'),
    {
        expiresIn: "1h"
    })

    return res.status(200).json({access_token: token});
}

exports.update = async (req, res) => {
    const user = await Users.findOne({ where: { email: req.user.email } })
    
    if(user) {
        user.update({
            cep: req.body.cep,
            localidade: req.body.localidade,
            uf: req.body.uf,
            bairro: req.body.bairro,
            logradouro: req.body.logradouro,
            number: req.body.number
        })
    }

    return res.status(200).json({status: 200});
}

exports.login = async (req, res) => {
    const user = await Users.findOne({ where: { email: req.body.email } })

    if(user) {
        bcrypt.compare(req.body.password, user.password, async (error, result) => {
            if(error) {
                return res.status(401).json({error: 'E-mail ou Senha incorretos'});
            }
            
            if(result) {
                const token = await jwt.sign({
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                config.get('jwt_key'),
                {
                    expiresIn: "1h"
                })

                return res.status(200).json({access_token: token});
            }
        })
    } else {
        return res.status(401).json({error: 'E-mail ou Senha incorretos'});
    }
}