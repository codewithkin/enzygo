// Group type
/*
    @param {String} roomId - The ID of the room (to be used to identify the chat in websockets)
    @param {String} description - The group's description
    @param {Array} members The IDs of the users in the group
    @param {Date} createdAt - When the group was created
    @param {Array} tags - An array of tags thatd describe what the group is about 
    @param {String} createdBy - The id of the user who created the group
*/


import mongoose, {Schema, model} from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import Chat from './chatModel.js'

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
        trim: true,
        type: {
            type: String,
            enum: ['public', 'private'],
            default: 'public'
        },
        validate : {
            validator: (name) => /^[\p{L}\p{N} _-]+$/u.test(name),
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
    admins : [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    tags : {
        type: [ String],
        default : [],
    },
    pendingRequests : [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
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
        if(!this.members.includes(this.createdBy) && !this.admins.includes(this.createdBy)) {
            this.members.push(this.createdBy)
            this.admins.push(this.createdBy)
        }
        next()
    } catch (error) {
        next(error)
    }
})

groupSchema.pre('deleteOne', async function (next) {
    try {
        const filter = this.getFilter()
        const id = filter._id
        if (!id) {
            return next(new Error('No group id provided'))
        }
        await Chat.deleteMany({ groupId: id })
        next()
    } catch (error) {
        next(error)
    }
} )


export default model("group", groupSchema);