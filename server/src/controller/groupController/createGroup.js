import groupModel from "../../models/groupModel";
import unifiedResponse from "../../utils/unifiedResponseFormat";
export const createGroup = async (req, res) => {
    try{
        const {roomId, description, roomName,  tags } = req.body
        if (!(roomId || description || roomName)) {
            return res.json(unifiedResponse(
                402,
                "roomId and description are required",
                null
            ))
        }
        const group = await groupModel({
            roomId, 
            description, 
            roomName, 
            tags,
            members : user.username
        })

        await group.save()
        return res.json(unifiedResponse(
            200,
            "group created successfully",
            group
        ))
    } catch (error) {
        return res.json(unifiedResponse(
            500,
            "error creating group",
            null
        ))
    }
}