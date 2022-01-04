//import mongoose from 'mongoose'; 
var mongoose = require('mongoose');
const product = mongoose.Schema({
    image: String,
    price: Number, 
   
    carts:[{
        type: mongoose.Schema.Types.ObjectId,
    ref: "carts"
    }]
})
var Product = module.exports = mongoose.model('products', product); 
// module.exports.get = function (callback, limit) {
//     Product.find(callback).limit(limit);
// }
module.exports=Product 