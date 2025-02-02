import groupModel from "../../models/groupModel";

export const groupEvents = (socket, io) => {
    socket.on('join-group', async ({roomId, userId}) => {
        if (!(roomId || userId)) {
            return io.emit('error', 'Could not join group')
        }
        socket.join(roomId);
        const updateMembers = await groupModel.findByIdAndUpdate(roomId,
            {
                $push: {members: userId},
            })
        io.to(roomId).emit('user-joined', socket.username);  // Notify others in the room
    })
}