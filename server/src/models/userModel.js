import {Schema, model} from "mongoose";

const UserModel = Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    chats: {
        type: Array,
        default: []
    },
    created_at : {
        type : Date,
        default : Date.now
    }
})

export default model("User", UserModel);