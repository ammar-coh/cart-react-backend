const Product = require('./productModel');
var mongoose = require('mongoose');
const Auth = require("./auth");
const Cart = require('./cartModel');
const User = require('./userModel');

// Handle index actions

exports.index = async (req, res) => {

    const id = req.query.id
    console.log( 'chq',req.query.id)
    const getUser = await User.findById({
        _id: id
    })
   
    var cartId = getUser.cart._id.toString()
    const loggedInUserCart = await Cart.findById({
        _id: cartId
    })
    res.json(loggedInUserCart)
}
// Handle create new product 
exports.new = async function (req, res) {
    {
        /**user and product Ids from the request */
    }

    var userId = req.body.id
    var product_id = req.body.product_id
   
    const usera = await User.findById(userId)
   

    {
        /**In case no user cart exist (creates new cart for the user)
            In case user cart already exists the else part will run*/
    }
    if (usera.cart == undefined) {
        var cart = new Cart();
        cart.save();
        const id = req.body
        const user = await User.findById({
            _id: id.id
        })
        user.cart = cart;
        await user.save();
        var newCartId = user.cart._id.toString()
        const newUserCart = await Cart.findById({
            _id: newCartId
        })
        var whole = await Product.findById(product_id)
        console.log('do',whole)
        newUserCart.products.push(whole)
        newUserCart.products.map(i=>{
            if (i.id === product_id){
                i.image = whole.image
                i.price = whole.price
            }
        })
    
        newUserCart.save()
        res.json({
            message: 'Congratulations! you have a  cart now',
            data: newUserCart
        })

    } else {
        const second = usera.cart._id.toString()


        const existingCart = await Cart.findById(second);

        const check = existingCart.products.find(c => c._id == product_id)

        if (check) {
            const array = existingCart.products
            array.map(i => {

                if (i._id.toString() == product_id) {
                    i.qty++

                }

            })
        } else {
            existingCart.products.push(product_id)
            var whole = await Product.findById(product_id)
            existingCart.products.map(i=>{
                if (i.id === product_id){
                    i.image = whole.image
                    i.price = whole.price
                }
            })

        }

        var totalQty = []
        var sum = 0
        existingCart.products.map(i => {

            totalQty.push(i.qty)
            sum += i.qty
        })



        existingCart.totalItems = sum
        existingCart.save()
        res.json({
            message: 'Product added',
            data: existingCart
        })
    }
};
exports.delete = async function (req, res) {
    console.log("check", req.body.product_id)
    const id = req.body.id
    const product_id = req.body.product_id
    const user = await User.findById({_id: id})
    console.log('user',user)
    const cartID = await user.cart
    console.log('cartID',cartID)
    const userCart= await Cart.findById({_id:cartID})
    console.log('cart',userCart)
    const cartItems = userCart.products
    console.log(cartItems)
    const getProduct= cartItems.find(i=>i._id==product_id)
    console.log('theee',getProduct)
    console.log('ch', cartItems)
    const index = cartItems.findIndex(i => i==getProduct)
    console.log(index)
    cartItems.splice(index,1)
     console.log('neo',cartItems)
    var tot = userCart.totalItems

  console.log(tot)
  userCart.totalItems= tot-getProduct.qty
  console.log(userCart.totalItems)
   userCart.save()
   res.json(userCart)
    //const options = { new: true };
    // const deleted = await Product.findByIdAndDelete(product_id, options)
    // console.log(deleted)
    //res.json(deleted)
};
