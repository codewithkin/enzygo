import chatModel from "../../models/chatModel";
import userModel from "../../models/userModel";

export const chatEvents = (socket, io) => {
    // event handlers for socket.io events that you want to listen to are here
    socket.on('group-chat', async ({ roomId, userId, message}) => {
        if (!(roomId || userId || message)) {
            return io.emit('error', 'Invalid message');
        }

        if ( roomId && message) {
            const groupChat = await chatModel({roomId, otherUserId: userId, message})
            await groupChat.save();
            const userChat = await userModel.findByIdAndUpdate(userId,
                {
                    $push: {chats : message} 
                })
            io.to(roomId).emit('group-message', {from: socket.username, message});
        }
    });

    socket.on('private-chat', ({to, message}) => {
        const recipient = Array.from(io.sockets.sockets.values()).find(s => s.username === to)
        if (!recipient) {
            return io.emit('error', 'User not found');
        }

        if (!(recipient || message)) {
            return io.emit('error', 'Invalid message');            
        }
        
        io.to(recipient.id).emit('private-message', {from: socket.username, message});
    })
}