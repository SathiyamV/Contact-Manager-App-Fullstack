const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = {
                id: decoded.id,
                email: decoded.email
            };
            next();
        } catch (err) {
            res.status(401);
            throw new Error("User is not authorized");
        }
    } else {
        res.status(401);
        throw new Error("Authorization token missing");
    }
});

module.exports = validateToken;