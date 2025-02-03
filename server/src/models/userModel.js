import {Schema, model} from "mongoose";
import validator from "validator";

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
        required : [true, "Email is required"],
        unique : true,
        lowercase : true,
        trim: true,
        validate : {
            validator: (email) => validator.isEmail(email), 
            message: "Invalid email format"
        }
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [20, "Username must be at most 20 characters long"],
        validate: {
            validator: (value) => /^(?![-_])(?!(.*[-_].*){2})[a-zA-Z0-9_-]+$/.test(value),
            message: "Username must be alphanumeric and can contain underscores and hyphens but cannot start or end with them"     
        }
    },
    profilePicture: {
        type: String,
        default: "https://i.pinimg.com/236x/cc/77/b3/cc77b348508729a9e6575bd4cbd2f445.jpg",
        validate: {
            validator: (url) => validator.isURL(url, { protocols: ['https'], require_protocol: true }),
            message: "Invalid URL. Must be a valid HTTPS link."
        }
    },
    verificationToken: {
        token: {type: String, unique:true},
        expires: {type: Date},
        required: [true, "Verification token is required"]
    },
    session: {
        token: {
                iv: {type: String},
                encryptedData: {type: String}
            },
        expires: {type: Date},
        required: [true, "Session token is required"]
    },
    chats: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Chat',
        },
    ],
    groups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group',
        }
    ],
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'super-admin'],
        default: 'user'
    },
    last_login : {
        type : Date,
        default: null
    },
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

export default model("User", UserModel);