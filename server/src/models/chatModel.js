// Chat type
/*
    @param {String} roomId - The ID of the room (to be used to identify the chat in websockets)
    @param {String} otherUserId - The ID of the user that sent the message
    @param {Date} createdAt - The time the first message was sent i.e when the chat was started
*/

import {Schema, model} from "mongoose";

const chatSchema = new Schema({
    roomId : {
        type : String,
        required: true,
        unique: true
    },
    message : {
        type : String,
        required: true,
    },
    otherUserId: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now
    }
})

export default model("chat", chatSchema);