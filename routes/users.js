var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController')


/* GET users listing. */
router.get('/', userController.listUsers);


router.get('/registrar', userController.registrarUsers);
module.exports = router;
