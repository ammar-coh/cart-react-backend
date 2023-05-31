// const mongoose = require('mongoose');

// const groupChatMessageSchema = new mongoose.Schema({
//   chatRoomID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'chatRoom',
//     required: true
//   },
//   senderId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'users',
//     required: true
//   },
//   messages: [{
//     type: String,
//     required: true
//   }],
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });

// const GroupChatMessage = mongoose.model('GroupChatMessage', groupChatMessageSchema);

// module.exports = GroupChatMessage;
