var router = require('express').Router();
const payController = require('../controllers/payController');

router.post('/card', payController.card);
router.post('/boleto', payController.boleto);
router.post('/picpay', payController.picpay);
router.post('/pix', payController.pix);
router.get('/charge/:id', payController.charge);
router.get('/coupons/:code', payController.coupons);
  
module.exports = router;