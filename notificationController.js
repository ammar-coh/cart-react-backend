const Notification = require("./notificationModel");
const { ObjectId } = require("mongodb");
const Auth = require("./auth");
const bodyParser = require("body-parser");
const User = require("./userModel");
// Handle index actions

exports.index = async (req, res) => {
  //   var room_id = req.query.roomID;
  //   await ChatRoom.collection.findOne({ roomID: room_id }, (err, data) => {
  //     if (err) {
  //       console.error("Error finding chatroom:", err);
  //       return;
  //     }
  //     if (data) {
  //       res.json({
  //         message: "chat ",
  //         status: true,
  //         data: data,
  //       });
  //     } else {
  //       res.json({
  //         message: "chat  not found",
  //         status: false,
  //         data: { roomID: room_id },
  //       });
  //     }
  //   });
};
// Handle create new product
exports.new = async function (req, res) {
  console.log("req.body", req.body);
  var userId = req.body.id;
  const user = await User.findById({ _id: userId });
  var convertUserCollectionToObj = user.toObject();
  console.log(convertUserCollectionToObj.hasOwnProperty("notification"))
  if(!convertUserCollectionToObj.hasOwnProperty("notification")){
    let notification = new Notification();
    notification.save();
    console.log("user", user);
    user.notification = notification;
    user.save();
  var user_notification_id = user.notification._id.toString();
      const notification_messages = await Notification.findById({
          _id: user_notification_id,
        });
        console.log("user notification", notification_messages)
  }
  else{
    console.log("user document has a notifications property in database")
  }
 
 };
