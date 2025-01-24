import mongoose from "mongoose";

const UserModel = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    role : {
        type : String,
        required : true,
        default : "user"
    },
    created_at : {
        type : Date,
        default : Date.now
    }
})

export default mongoose.model("User", UserModel);