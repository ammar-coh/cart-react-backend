const mongoose = require("mongoose");
const users = new mongoose.Schema({
email: { type: String, required: true, unique: true },
password: { type: String, required: true, minlength: 6 },
displayName: { type: String },
role:{type: String,
enum:['admin','basic'],
default:'basic'},
cart:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "carts"
}
});
module.exports = mongoose.model("users", users);