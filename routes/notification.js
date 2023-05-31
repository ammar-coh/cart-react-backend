var express = require('express');
var router = express.Router();
const auth = require("../auth");

/* GET home page. */
// Product routes
var notificationController = require('../notificationController');
router.get('/users-notification', auth, notificationController.index)
router.post('/users-notification',auth, notificationController.new);
// router.put('/list/:product_id', auth, productController.updating)
// router.delete('/list/:product_id',auth,  productController.delete);





module.exports = router;