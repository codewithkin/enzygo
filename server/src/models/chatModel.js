// Chat type
/*
    @param {String} roomId - The ID of the room (to be used to identify the chat in websockets)
    @param {String} otherUserId - The ID of the user that sent the message
    @param {Date} createdAt - The time the first message was sent i.e when the chat was started
*/

import mongoose, {Schema, model} from "mongoose";

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
        maxlength: [1000, "Message must be less than 1000 characters"]
    },
    senderId: {
        type: Schema.Types.ObjectId,
        required: [true, "Message must have a sender"],
        ref: 'User'
    },
    groupId: {
        type: Schema.Types.ObjectId,
        default: null, // default is null because the chat might not be in a group
        ref: 'Group'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

chatSchema.index({ roomId: 1, createdAt: 1, senderId: 1 });

chatSchema.pre('save', async function(next){
    if(this.groupId && !this.roomId) {
        const Group = mongoose.model('Group');
        const group = await Group.findById(this.groupId);
        if(group) {
            this.roomId = group.roomId;
        } else {
            throw new Error('Group not found');
        }
    } else if(!this.groupId && !this.roomId) {
        const privateMessageId = [this.senderId, Date.now()].join('_')
        this.roomId = privateMessageId;
    }
    next();
})

export default model("chat", chatSchema);