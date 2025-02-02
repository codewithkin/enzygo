import groupModel from "../../models/groupModel";
import unifiedResponse from "../../utils/unifiedResponseFormat";

export const getAllGroup = async (req, res) => {
  try {
    const group = await groupModel.find();
    return res.status(200).json(unifiedResponse(
        200, 
        "groups retrieved successfully", 
        group));
  } catch (error) {
    return res.status(500).json(unifiedResponse(
        500, 
        "error retrieving groups", 
        error
    ));
  }
}