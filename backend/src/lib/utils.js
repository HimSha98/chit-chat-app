import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const { JWT_SECRET, NODE_ENV } = process.env;

    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured!");
    }

    if (!NODE_ENV) {
        throw new Error("NODE_ENV is not configured!");
    }

    // HS CREATING JWT TOKEN
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '7d'
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 60 * 1000, // HS FOR SEVEN DAYS IN MILLISECONDS
        httpOnly: true, // HS PREVENT XSS ATTACKS, THE TOKEN CAN BE ACCESSIBLE ONLY THROUGH HTTP, WITH JS NO ONE CAN ACCESS THIS
        sameSite: "strict", // HS PREVENT CSRF ATTACKS
        // HS THIS SECURE VALUE DEPENDS ON HTTP FOR DEVELOPMENT AND HTTPS FOR PRODUCTION
        secure: NODE_ENV === "development" ? false : true,
    });

    return token;
}