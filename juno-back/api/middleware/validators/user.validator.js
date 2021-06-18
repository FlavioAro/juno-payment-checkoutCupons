const { check, validationResult } = require('express-validator');

exports.validateUser = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Preencha o campo nome')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimo 3 caracteres requerido')
        .bail(),
    check('email')
        .not()
        .isEmpty()
        .withMessage('Preencha o campo email')
        .bail()
        .isEmail()
        .withMessage('Email inválido')
        .bail(),
    check('phone')
        .not()
        .isEmpty()
        .withMessage('Preencha o campo telefone')
        .bail()
        .isLength({ min: 14 })
        .withMessage('Minimo 10 caracteres requerido')
        .bail(),
    check('cpf')
        .not()
        .isEmpty()
        .withMessage('Preencha o campo cpf')
        .bail()
        .isLength({ min: 14 })
        .withMessage('Minimo 11 caracteres requerido')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.mapped() });
        next();
    },
];