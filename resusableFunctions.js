exports.saveMessageDB = async ({ room }) => {
    const message = { author: data.author, message: data.message };
    await room.messages.push(message);
    const messageUpdated = {
      messages: room.messages,
    };
    let options = { new: true };
    const chatroomMessagesSaved = await ChatRoom.findByIdAndUpdate(
      room._id.toString(),
      messageUpdated,
      options
    );
  };