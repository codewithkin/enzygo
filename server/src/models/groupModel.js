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
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

const groupSchema = new Schema({
    roomId : {
        type : String,
        required : [true, "Room ID is required"],
        unique : true,
        trim : true,
        default: () => uuidv4()
    },
    roomName : {
        type: String,
        required : [true, "Room name is required"],
        unique : true,
        trim: true,
        validate : {
            validator: (name) => /^[a-zA-Z0-9 _-]+$/.test(name),
            message:  "Room name must be alphanumeric and can contain spaces, underscores, or hyphens"
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
        minLength: [10, "Description must be at least 10 characters"]
    },
    members :[
        {
            type: Schema.Types.ObjectId, 
            ref: 'User',
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
}, {timestamps: true})

groupSchema.index({ description: 'text'})
groupSchema.index({ createdBy: -1 });
groupSchema.index({ members: 1 });
groupSchema.index({ tags: 'text' });

groupSchema.pre('save', function (next) {
    try {
        if(!this.members.includes(this.createdBy)) {
            this.members.push(this.createdBy)
        }
        next()
    } catch (error) {
        next(error)
    }
})


export default model("group", groupSchema);