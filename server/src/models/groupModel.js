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
import validator from "validator";
import { V4 as uuidv4 } from 'uuid';

const groupSchema = new Schema({
    roomId : {
        type : String,
        required : [true, "Room ID is required"],
        unique : true,
        trim : true,
        validate :{
            validator: (id) => /^[a-zA-Z0-9_- ]+$/.test(id),
            message: "Room ID must be alphanumeric"
        }
    },
    roomName : {
        type: String,
        required : [true, "Room name is required"],
        unique : true,
        trim: true,
        validate : {
            validator: (name) => /^[a-zA-Z0-9 ]+$/.test(name),
            message: "Room name must be alphanumeric and can contain spaces"
        },
        lowercase: true,
        maxLength: [50, "Room name must be less than 50 characters"],
        minLength: [3, "Room name must be at least 3 characters"]
    },
    description : {
        type : String,
        required : [true, "Description is required"],
        trim : true,
        maxLength: [200, "Description must be less than 200 characters"],
        minLength: [10, "Description must be at least 3 characters"]
    },
    members :[
        {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required : [true, "Members list cannot be empty"],
            validate : {
                validator: (members) => members.length > 0,
                message: "Group must have at least one member"
            }
        }
    ],
    tags : {
        type: [ String],
        default : [],
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref: 'User',
        required : [true, "Creator information is required"]
    }
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}})

groupSchema.pre('save', function (next) {
    if(!this.roomId) {
        this.roomId = uuidv4();
    }
    next();
})


export default model("group", groupSchema);