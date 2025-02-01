import { decrypt } from '../../utils/Encryption.js';
import unifiedResponse from "../../utils/unifiedResponseFormat.js";

const userAuthent = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = decrypt(token);
        if (!decoded) {
            return res.json(unifiedResponse(
                401,
                'Token is invalid or expired.',
                null
            ))
        
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
    }
}