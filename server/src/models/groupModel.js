// Group type
/*
    @param {String} roomId - The ID of the room (to be used to identify the chat in websockets)
    @param {String} description - The group's description
    @param {Array} members The IDs of the users in the group
    @param {Date} createdAt - When the group was created
    @param {Array} tags - An array of tags thatd describe what the group is about 
    @param {String} createdBy - The id of the user who created the group
*/

import {Schema, model} from "mongoose";

const groupSchema = new Schema({
    roomId : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true
    },
    members : {
        type : Array,
        default : []
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    tags : {
        type : Array,
        default : []
    }
})
export default model("group", groupSchema);