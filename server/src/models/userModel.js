import {Schema, model} from "mongoose";

// Code explanation
/**
 * Email - The user's email
 * verificationToken - A token generated when the user attemps to sign up or sign in. This token is sent to their email to validate that they own it. It expires after 2 minutes (120 seconds) by default
 * session - The user's active session, this is used to ensure data integrity between the frontend and the backend, it expires after 3 days by default
 * chats - An array of chat rooms the user is in (you can think of these as whatsapp cahats (a group is its own entity, it doesn't count))
 * created_at - The date and time the user's account was created
 */

const UserModel = Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        default: "https://i.pinimg.com/236x/cc/77/b3/cc77b348508729a9e6575bd4cbd2f445.jpg"
    },
    verificationToken: {
        type: {
            token: String,
            expires: Date,
        },
        required: true,
        unique: true,
    },
    session: {
        type: {
            token: String,
            expires: Date,
        },
        required: true,
        unique: true,
    },
    chats: {
        type: Array,
        default: []
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    last_login : {
        type : Date,
    },
    created_at : {
        type : Date,
        default : Date.now
    }
})

export default model("User", UserModel);