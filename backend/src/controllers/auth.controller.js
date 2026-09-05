import User from "../models/User.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required!"});
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters."});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid Email Format!"});
        }

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({ message: "Email Already Existed!"});
        }

    } catch(error) {
        
    }
};