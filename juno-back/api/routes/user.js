var router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authenticate')
const { validateUser } = require('../middleware/validators/user.validator')

router.post('/update', auth, userController.update);
router.post('/register', validateUser, userController.register);
router.post('/login', userController.login);
  
module.exports = router;