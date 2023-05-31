var mongoose = require("mongoose");

const notification = mongoose.Schema({
  messages: [
    {
      author: String,
      message: String,
      author_id: String,
      is_read: { type: Boolean, default: false },
    },
  ],

  total: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
var Notification = (module.exports = mongoose.model(
  "notification",
  notification
));

module.exports = Notification;
