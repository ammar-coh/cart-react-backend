const Product = require("./productModel");
//var mongoose = require('mongoose');
const Auth = require("./auth");

// Handle index actions

exports.index = async (req, res) => {
  const list = await Product.find();
  res.json(list);
};
// Handle create new product
exports.new = async function (req, res) {
  let { image, price, rating, stock } = req.body;
  var product = new Product();
  var currentList = await Product.find();
  Object.assign(product, {
    image: image,
    price: price,
    rating: rating,
    stock: stock,
  });
  product.save();
  currentList.push(product);

  var updatedList = currentList;
  res.json({
    message: "new product has been added!",
    data: product,
    updatedProductlist: updatedList,
  });
};

// Handle update product info
exports.updating = async function (req, res) {
  const id = req.body.product_id;
  const updates = req.body;
  const options = { new: true };
  const products = await Product.findByIdAndUpdate(id, updates, options);
  res.json(products);
};
// Handle delete product info
exports.delete = async function (req, res) {
  const id = req.body.product_id;
  const options = { new: true };
  const deleted = await Product.findByIdAndDelete(id, options);
  console.log(deleted);
  res.json(deleted);
};
