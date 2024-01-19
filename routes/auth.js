const {Router} = require('express');
const { check } = require('express-validator');
const { login, autenticado } = require('../controllers');

const router= Router();


router.post('/login', login);

router.get('/validar-token', autenticado);

module.exports= router;