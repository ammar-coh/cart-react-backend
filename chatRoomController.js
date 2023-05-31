const ChatRoom = require("./chatRoomModel");
const { ObjectId } = require("mongodb");
const Auth = require("./auth");
const bodyParser = require("body-parser");

// Handle index actions

exports.index = async (req, res) => {
  var room_id = req.query.roomID;
  await ChatRoom.collection.findOne({ roomID: room_id }, (err, data) => {
    if (err) {
      console.error("Error finding chatroom:", err);
      return;
    }

    if (data) {
      res.json({
        message: "chat ",
        status: true,
        data: data,
      });
    } else {
      res.json({
        message: "chat  not found",
        status: false,
        data: { roomID: room_id },
      });
    }
  });
};
// Handle create new product
exports.new = async function (req, res) {
  const chat = new ChatRoom();
  const roomExists = async (data) => {
    const findMemberExist = data.data.member;
    const updatedChatRoomDocument = async (data) => {
      const chatUpdated = await ChatRoom.findByIdAndUpdate(
        data.existingChatid,
        data.updates,
        data.options
      );
      res.json({
        message: "chat is now updated",
        data: chatUpdated,
      });
    };
    findMemberExist.forEach(async (i) => {
      if (i.toString() == data.participant) {
        console.log(" participant is already a amember");
        return;
      } else {
        let newMember = ObjectId(data.participant);
        await findMemberExist.push(newMember);
        const stringArrayMember = findMemberExist.map((objectId) =>
          objectId.toString()
        );
        const uniqueArray = await Array.from(new Set(stringArrayMember));
        const existingChatid = data.data._id.toString();
        const updates = {
          member: uniqueArray,
        };
        const options = { new: true };
        updatedChatRoomDocument({
          existingChatid: existingChatid,
          updates: updates,
          options: options,
        });
      }
    });
  };
  await ChatRoom.collection.findOne(
    { roomID: req.body.roomID },
    (err, data) => {
      if (err) {
        console.error("Error finding user:", err);
        return;
      }

      if (data) {
        console.log("Found chat:", data);
        roomExists({
          data: data,
          participant: req.body.participant,
          participant_2: req.body.participant_2,
        });
        // Do something with the found user
      } else {
        console.log("chat not found");
        chat.member.push(req.body.participant);
        chat.roomID = req.body.roomID;
        chat.participant_online_status.push(
          req.body.participant,
          req.body.participant_2
        );
        console.log('chat_test', chat)
        for (let i = 0; i <  chat.participant_online_status?.length; i++) {
          if ( chat.participant_online_status[i].id ==  req.body.participant) {
            chat.participant_online_status[i].status = true;
          }
        }

        chat.save();

        console.log("chat", chat);
        res.json({
          message: "chat room has been created",
          data: chat,
        });
      }
    }
  );
};

// Handle update product info
// exports.updating = async function (req, res) {
//   const id = req.body.product_id;
//   const updates = req.body;
//   const options = { new: true };
//   const products = await Product.findByIdAndUpdate(id, updates, options);
//   res.json(products);
// };
// // Handle delete product info
// exports.delete = async function (req, res) {
//   const id = req.body.product_id;
//   const options = { new: true };
//   const deleted = await Product.findByIdAndDelete(id, options);
//   console.log(deleted);
//   res.json(deleted);
// };
