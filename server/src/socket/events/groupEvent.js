import groupModel from "../../models/groupModel";
import chatModel from "../../models/chatModel";

export const groupEvents = (socket, io) => {
    socket.on('request-join-group', async function({userId, groupId}) {
        try {
            if (!(userId || groupId)) {
                return socket.emit('error', 'Invalid request! Please enter user ID and group ID');
            }
            
            const groupExisted = await groupModel.findById(groupId);
            
            if (!groupExisted) {
                return socket.emit('error', 'Group not found');
            }
            
            if (groupExisted.type === 'public') {
                // add user to group
                const groupUpdate = await groupModel.findByIdAndUpdate(
                    groupId,
                    { $addToSet: { members: userId } },
                    { new: true }
                )
                socket.username = groupUpdate.members.find(member => member._id.toString() === userId).username
                // broadcast to all users in the group
                io.to(groupId).emit('new-member', {
                    userId,
                    username: socket.username
                });

                // broadcast to joined users
                socket.emit('join-sucess', {
                    groupId,
                    groupName: groupUpdate.roomName
                })

            } else if (groupExisted.type === 'private') {
                if (groupExisted.members.includes(userId)) {
                    return socket.emit('error', 'You are already a member of this group');
                }
                if (groupExisted.pendingRequests.includes(userId)) {
                    return socket.emit('error', 'You have already requested to join this group');
                }

                // add user to pending requests
                await groupModel.findByIdAndUpdate(
                    groupId,
                    { $addToSet: { pendingRequests: userId } },
                    { new: true }
                )

                // send notification to the group admin
                const admins = groupExisted.admins
                io.to(admins.map(admin => admin)).emit('new-jpin-request', {
                    userId,
                    username: socket.username,
                    groupId,
                    groupName: groupExisted.roomName
                });
            }
        } catch (error) {
            socket.emit('error', 'failed to join group');
        }
    })
}


export const approveRequest = (socket, io) => {
    socket.on('approve-request', async function({groupId, userId}) {
        try {
            if (!(groupId || userId)) {
                return socket.emit('error', 'Invalid request! Please enter user ID and group ID');
            }

            const group = await groupModel.findById(groupId);

            if (!group) {
                return socket.emit('error', 'Group not found');
            }

            if (!group.admins.includes(userId)) {
                return socket.emit('error', 'Unauthorized');
            }

            if (!group.pendingRequests.includes(userId)) {
                return socket.emit('error', 'No pending request found');
            }
            
            const groupUpdate = await groupModel.findByIdAndUpdate(
                groupId,
                { $pull: { pendingRequests: userId }, 
                $addToSet: { members: userId } },
                { new: true }
            )

            // notify the user
            io.to(userId.toString()).emit('group-join-approved',{
                groupId,
                groupName: groupUpdate.roomName
            })

            // notify all members of the group
            io.to(groupId).emit('new-member-joined', {
                userId,
                username: socket.username
            })
        } catch (error) {
            socket.emit('error', 'failed to approve request');
        }
    })
}
            
export const enterGroup = (socket, io) => {
    socket.on('enter-group', async function({groupId, userId}) {
        try {
            if (!(groupId || userId)) {
                return socket.emit('error', 'Invalid request! Please enter user ID and group ID');
            }
            
            const group = await groupModel.findById(groupId);
            
            if (!group) {
                return socket.emit('error', 'Group not found');
            }

            if (group.members && !group.members.includes(userId)) {
                return socket.emit('error', 'You are not a member of this group');
            }
            
            // join socket.IO to the group
            socket.join(groupId);
            
            // notify all members of the group
            socket.to(groupId).emit(`${socket.username} entered`, {
                userId,
                username: socket.username
            })

            // send chat history to entered user
            const message = await chatModel.find({roomId: groupId.roomId})
                .sort({createdAt: -1})
                .limit(20);
            
            socket.emit('chat-history', message);
            
        } catch (error) {
            socket.emit('error', 'failed to enter group');
        }
    })
}