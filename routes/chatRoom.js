var express = require('express');
var router = express.Router();
const auth = require("../auth");

/* GET home page. */
// Product routes
var chatRoomController = require('../chatRoomController');
router.get('/users-chatRoom', auth, chatRoomController.index)
router.post('/users-chatRoom',auth, chatRoomController.new);
// router.put('/list/:product_id', auth, productController.updating)
// router.delete('/list/:product_id',auth,  productController.delete);





module.exports = router;
