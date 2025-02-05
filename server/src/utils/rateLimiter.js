import rateLimiter from 'express-rate-limit'

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max : 5,
    message : "Too many attempts, Try again after 15 minutes",
})

const refreshTokenLimit = rateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message : "Too many attempts, Try again after 5 minutes",
})

const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many messages sent. Please wait a few minutes.'
  });
  
export { limiter, refreshTokenLimit, chatLimiter }