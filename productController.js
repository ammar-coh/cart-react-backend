const Product = require('./productModel');
//var mongoose = require('mongoose');
const Auth = require("./auth");

// Handle index actions

exports.index = async (req, res) => {

    const list = await Product.find()
    res.json(list)
}
// Handle create new product 
exports.new = function (req, res) {
    var product = new Product();
    console.log("check", req.body)
    product.image = req.body.image;
    product.price = req.body.price

    product.save(function (err) {

        res.json({
            message: 'New contact created!',
            data: product
        });
    });
};

// Handle update product info
exports.updating = async function (req, res) {
    console.log("check", req.body.product_id)
    const id = req.body.product_id
    const updates = req.body
    const options = { new: true }
    const products = await Product.findByIdAndUpdate(id, updates, options)
    res.json(products)
};
// Handle delete product info
exports.delete = async function (req, res) {
    console.log("check", req.body.product_id)
    const id = req.body.product_id
    const options = { new: true };
    const deleted = await Product.findByIdAndDelete(id, options)
    console.log(deleted)
    res.json(deleted)
};
