var express = require('express');
var router = express.Router();
const auth = require("../auth");

/* GET home page. */
// Product routes
var productController = require('../productController');
router.get('/list',auth,  productController.index)
router.post('/list', productController.new);
router.put('/list/:product_id', auth, productController.updating)
router.delete('/list/:product_id',auth,  productController.delete);





module.exports = router;
