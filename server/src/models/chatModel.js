// Chat type
/*
    @param {String} roomId - The ID of the room (to be used to identify the chat in websockets)
    @param {String} otherUserId - The ID of the user that sent the message
    @param {Date} createdAt - The time the first message was sent i.e when the chat was started
*/

import {Schema, model} from "mongoose";
import Group from './groupModel.js'

const chatSchema = new Schema({
    roomId : {
        type : String,
        required: [true, "Room ID is required"],
        trim: true,
    },
    message : {
        type : String,
        required: [true, "Message is required"],
        trim: true,
        minLength: [1, "Message must be at least 1 character"],
        maxlength: [5000, "Message must be less than 5000 characters"]
    },
    senderId: {
        type: Schema.Types.ObjectId,
        required: [true, "Message must have a sender"],
        ref: 'User'
    },
    recipientId: {
        type: Schema.Types.ObjectId,
        required: function () {
            // recipientId is required only for private chats
            return this.chatType === 'private';
        },
        ref: 'User',
        validate : {
            validator: function (value) {
                return this.chatType === 'private' ? !!value : true; // recipientId is not required for group chats
            },
            message: 'Recipient ID is required for private chat'
        }
    },
    chatType: {
        type: String,
        enum: ['private', 'group'],
        required: true,
        default: 'private'  // default is private chat type if not provided
    },
    groupId: {
        type: Schema.Types.ObjectId,
        default: null, // default is null because the chat might not be in a group
        ref: 'Group'
    },
    status: {
        type: String,
        enum: ['pending', 'delivered', 'read'],
        default: 'pending',
        index: true
      },
    deliveredTo: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    readBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true})

chatSchema.index({ message: 'text' });
chatSchema.index({ roomId: 1, createdAt: -1 });
chatSchema.index({ createdAt: -1 });
chatSchema.index({ senderId: 1, recipientId: 1 });

chatSchema.pre('save', async function(next){
    try {
        if(this.chatType === 'group' && this.groupId && !this.roomId) {
            const group = await Group.findById(this.groupId);
            if(group) {
                this.roomId = group.roomId;
            } else {
                throw new Error('Group not found');
            }
        } else if(this.chatType === 'private' && !this.roomId) {
            if (!this.recipientId) {
                throw new Error('Recipient ID is required for private chat');
            }
            const privateMessageId = [this.senderId.toString(), this.recipientId.toString()].sort().join('_')
            this.roomId = privateMessageId;
        }
        next()
    } catch (error) {
        next(error);
    }
})

export default model("chat", chatSchema);