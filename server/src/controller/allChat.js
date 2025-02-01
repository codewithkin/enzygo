import chatModel from "../models/chatModel";
import unifiedResponse from "../../utils/unifiedResponseFormat.js";

const getChats = async (req, res) => {
    try {
        const chats = await chatModel.find();
        return res.json(unifiedResponse(200, "Chats retrieved successfully", chats));
    } catch (error) {
        return res.json(unifiedResponse(500, "Failed to retrieve chats", error));
    }
}


export default {
    getChats
}