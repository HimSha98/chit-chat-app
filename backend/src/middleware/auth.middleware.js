import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ENV } from '../lib/env.js';

// HS THIS IS THE AUTHENTICATION CHECK FUNCTION
export const protectRoute = async (req, res, next) => {
    try {
        // HS CHECK IF TOKEN EXISTED OR NOT
        const token = req.cookie.jwt;
        if (!token) return res.status(401).json({message: "Unauthorized - No Token Provided!"});

        // HS CHECK IF TOKEN IS VALID OR NOT
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded) return res.status(401).json({message: "Unauthorized - Token Is Not Valid!"});

        // HS CHECK IF THE USER EXISTED OR NOT
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) return res.status(400).json({message: "User Not Found!"});

        req.user = user // HS THIS IS THE CUSTOM FIELD THAT WE HAVE JUST ADDED TO THE REQUEST
        next(); // HS NEXT FUNCTION HERE IT WILL BE UPDATE PROFILE OR WHAT EVER IT IS.

    }catch (error) {
        console.log('Error in the authentication:', error);
        return res.status(500).json({message: 'Internal Server Error!'});
    }
}