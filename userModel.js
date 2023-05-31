const mongoose = require("mongoose");
const users = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  displayName: { type: String },
  is_online: { type: Boolean, default: false },
  role: { type: String, enum: ["admin", "basic"], default: "basic" },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  notification: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "notification",
  },
  chatRoom: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chatRoom",
    },
  ],

  socketID: { type: String, default: "" },
});
module.exports = mongoose.model("users", users);
