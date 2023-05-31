var express = require('express');
var router = express.Router();
const auth = require("../auth");

/* GET home page. */
// Product routes
var cartController = require('../cartController');

router.post('/user-cart', auth, cartController.new);
router.delete('/user-cart', auth, cartController.delete);
router.get('/user-cart', cartController.index)
/*router.put('/list/:product_id', auth, productController.updating)
router.delete('/list/:product_id', auth, productController.delete);*/





module.exports = router;
