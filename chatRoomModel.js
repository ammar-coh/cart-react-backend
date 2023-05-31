const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  roomID: {
    type: String,
    required: true,
  },
  member: [
    {
      participant: String,
    },
  ],
  messages: [
    {
      author: String,
      message: String,
      author_id: String,
      isRead: { type: Boolean, default: false },
    },
  ],
  participant_online_status: [
    { participant: String, status: { type: Boolean, default: false } },
  ],
});

const ChatRoom = mongoose.model("chatRoom", chatRoomSchema);

module.exports = ChatRoom;
