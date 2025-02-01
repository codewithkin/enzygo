import joi from 'joi';


const groupSchema = joi.object({
    roomId: joi.string()
        .replace(),

    description: joi.string()
        .required(),

    members: joi.array()
        .optional(),

    createdAt: joi.date()
        .optional(),

    tags: joi.array()
        .optional(),
    
})

export default groupSchema