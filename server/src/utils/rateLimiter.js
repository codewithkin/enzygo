import rateLimiter from 'express-rate-limit'

const verifyLimit = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max : 5,
    message : "Too many attempts, Try again after 15 minutes",
})

const refreshTokenLimit = rateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message : "Too many attempts, Try again after 5 minutes",
})

export { verifyLimit, refreshTokenLimit }