var router = require('express').Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.index);
  
module.exports = router;