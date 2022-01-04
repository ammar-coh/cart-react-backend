var express = require('express');
var router = express.Router();
const auth = require("../auth");

/* GET home page. */
// Product routes
var cartController = require('../cartController');
router.get('/user-cart', auth, cartController.index)
router.post('/user-cart', auth, cartController.new);
router.delete('/user-cart', auth, cartController.delete);
/*router.put('/list/:product_id', auth, productController.updating)
router.delete('/list/:product_id', auth, productController.delete);*/





module.exports = router;
