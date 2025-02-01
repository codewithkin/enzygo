import chatModel from "../models/chatModel";
import unifiedResponse from "../../utils/unifiedResponseFormat.js";


const getChats = async (req, res) => {
    try {
        const chats = await chatModel.find();
        return unifiedResponse(200, "Chats retrieved successfully", chats);
    } catch (error) {
        return unifiedResponse(500, "Failed to retrieve chats", error);
    }
}


export default {
    getChats
}