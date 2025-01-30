import joi from 'joi'

const verificationTokenSchema =  joi.object({
    token: joi.string().required(),
    expires: joi.date().required(),
})

const sessionSchema = joi.object({
    token: joi.object({
        iv: joi.string().required(),
        encryptedData: joi.string().required(),
    }).required(),
    expires: joi.date().required(),
});




const userSchema = joi.object({
    email : joi.string()
       .email({ minDomainSegments: 2})
       .required(),
    
    username : joi.string()
       .min(3)
       .max(20)
       .pattern(/^(?![-_])(?!(.*[-_].*){2})[a-zA-Z0-9_-]+$/, { name: 'alphanumeric' })
       .required(),

    profilePicture: joi.string()
       .uri({ scheme: ['https', 'http'] })
       .optional(),
    
    verificationToken: verificationTokenSchema.optional(),

    session: sessionSchema.optional(),

    chat: joi.array().optional(),

    isVerified: joi.boolean().optional(),
    
    role: joi.string().valid('user', 'admin','super-admin').optional(),

    last_login: joi.date().optional(),

    created_at : joi.date().optional(),

})

export default userSchema