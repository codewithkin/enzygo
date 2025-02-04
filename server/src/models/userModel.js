import {Schema, model} from "mongoose";
import validator from "validator";
import mongoose from "mongoose";

// Code explanation
/**
 * Email - The user's email
 * username - The user's username
 * profilePicture - The user's profile picture
 * verificationToken - A token generated when the user attemps to sign up or sign in. This token is sent to their email to validate that they own it. It expires after 2 minutes (120 seconds) by default
 * session - The user's active session, this is used to ensure data integrity between the frontend and the backend, it expires after 3 days by default
 * chats - An array of chats the user have sent (you can think of these as whatsapp chats (a group is its own entity, it doesn't count))
 * groups - An array of groups the user is a member of it
 * created_at - The date and time the user's account was created
 * isVerified - Whether  the user is verified or not with the token been sent 
 * roles - the role determines the permissions of the user
 * last_login - The last login time of the user
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
            validator: (value) => /^(?![-_])(?!.*[-_]{2})[a-zA-Z0-9_-]+$/.test(value),
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
        token: {type: String},
        expires: {type: Date},
    },
    session: {
        token: {
                iv: {type: String},
                encryptedData: {type: String}
            },
        expires: {type: Date},
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
}, {timestamps: true});

UserModel.index({ email: 1 });
UserModel.index({ username: 1 });

UserModel.pre('deleteOne', async function (next) {
    try {
        const filter = this.getFilter() // GET THE FILTER OBJECT
        const userId = filter._id;
        // Ensure the user ID is valid
        if (!userId) {
            throw new Error('User ID is required for deletion');
        }
        const Chat = mongoose.model('Chat');
        const Group = mongoose.model('Group');
        await Chat.deleteMany({ senderId: userId });
        await Group.updateMany(
            { members: userId }, 
            { $pull: { members: userId } });
        next();
    } catch (error) {
        next(error);
    }
});

export default model("User", UserModel);