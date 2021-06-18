const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    try {
        req.user = jwt.verify(req.headers.authorization.split(' ')[1], config.get('jwt_key'))
        next()   
    } catch (error) {
        return res.status(401).json({auth: 'Autenticação requerida'});
    }
}