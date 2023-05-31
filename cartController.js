const Product = require("./productModel");
var mongoose = require("mongoose");
const Auth = require("./auth");
const Cart = require("./cartModel");
const User = require("./userModel");

// Handle show user cart
exports.index = async (req, res) => {
  const id = await req.query.id;
  const getUser = await User.findById({
    _id: id,
  });
  var convertCollectionToObj = getUser.toObject();
  var userCart;
  var cartId;
  switch (convertCollectionToObj.hasOwnProperty("cart")) {
    case false:
      userCart = "No Cart in user database";
      break;
    default:
      cartId = await getUser?.cart?._id.toString();
      userCart = await Cart.findById({
        _id: cartId,
      });
  }
  res.json(userCart);
};

// Handle add new product to cart
exports.new = async function (req, res) {
  {
    /**user and product Ids from the request */
  }
  var userId = req.body.id;
  var product_id = req.body.product_id;
  const usera = await User.findById(userId);
  {
    /**In case no user cart exist (creates new cart for the user)
            In case user cart already exists the else part will run*/
  }
  if (usera.cart == undefined) {
    var newCart = new Cart();
    newCart.save();
    const id = req.body;
    const newUser = await User.findById({
      _id: id.id,
    });
    newUser.cart = newCart;
    await newUser.save();
    var newCartId = newUser.cart._id.toString();
    const newUserCart = await Cart.findById({
      _id: newCartId,
    });
    var whole = await Product.findById(product_id);
    newUserCart.products.push(whole);
    newUserCart.products.map((i) => {
      if (i.id === product_id) {
        i.image = whole.image;
        i.price = whole.price;
      }
    });

    newUserCart.save();
    res.json({
      message: "Congratulations! you have a  cart now",
      data: newUserCart,
    });
  } else {
    const second = usera.cart._id.toString();
    const existingCart = await Cart.findById(second);
    switch (existingCart) {
      case null:
        var cart = new Cart();
        cart.save();
        const id = req.body;
        const user = await User.findById({
          _id: id.id,
        });
        user.cart = cart;
        await user.save();
        var existingCartId = user.cart._id.toString();
        const existingUserCart = await Cart.findById({
          _id: existingCartId,
        });
        var existingWhole = await Product.findById(product_id);
        existingUserCart.products.push(existingWhole);
        existingUserCart.products.map((i) => {
          if (i.id === product_id) {
            i.image = existingWhole.image;
            i.price = existingWhole.price;
          }
        });

        existingUserCart.save();
        res.json({
          message: "Congratulations! you have a  cart now",
          data: existingUserCart,
        });
        break;

      default:
        const check = existingCart.products.find((c) => c._id == product_id);

        if (check) {
          const array = existingCart.products;
          array.map((i) => {
            if (i._id.toString() == product_id) {
              i.qty++;
            }
          });
        } else {
          existingCart.products.push(product_id);
          var whole = await Product.findById(product_id);
          existingCart.products.map((i) => {
            if (i.id === product_id) {
              i.image = whole.image;
              i.price = whole.price;
            }
          });
        }

        var totalQty = [];
        var sum = 0;
        existingCart.products.map((i) => {
          totalQty.push(i.qty);
          sum += i.qty;
        });

        existingCart.totalItems = sum;
        existingCart.save();
        res.json({
          message: "Product added",
          data: existingCart,
        });
        break;
    }
  }
};

// Handle delete  product from cart
exports.delete = async function (req, res) {
  const id = req.body.id;
  const product_id = req.body.product_id;
  const user = await User.findById({ _id: id });
  const cartID = await user.cart;
  const userCart = await Cart.findById({ _id: cartID });
  const cartItems = userCart.products;
  const getProduct = cartItems.find((i) => i._id == product_id);
  const index = cartItems.findIndex((i) => i == getProduct);
  cartItems.splice(index, 1);
  var tot = userCart.totalItems;
  userCart.totalItems = tot - getProduct.qty;
  userCart.save();
  res.json(userCart);
  //const options = { new: true };
  // const deleted = await Product.findByIdAndDelete(product_id, options)
  // console.log(deleted)
  //res.json(deleted)
};
