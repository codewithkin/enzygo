import joi from 'joi';

const chatSchema = joi.object({
    roomId: joi.string()
        .required(),

    otherUserId: joi.string()
        .required(),

    createdAt: joi.date()
        .optional(),
    
})


export default chatSchema