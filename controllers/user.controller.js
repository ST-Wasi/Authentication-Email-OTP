const userService = require('../services/user.service');

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, phone } = req.body;
            
            if (!name || !email || !phone) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const result = await userService.registerUser({ name, email, phone });
            res.status(201).json({
                success: true,
                ...result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    verifyRegistration: async (req, res) => {
        try {
            const { userId, otp } = req.body;
            
            if (!userId || !otp) {
                return res.status(400).json({
                    success: false,
                    message: "User ID and OTP are required"
                });
            }

            const result = await userService.verifyRegistration(userId, otp);
            res.status(200).json({
                success: true,
                ...result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    login: async (req, res) => {
        try {
            const { identifier } = req.body; // can be email or phone
            
            if (!identifier) {
                return res.status(400).json({
                    success: false,
                    message: "Email or phone number is required"
                });
            }

            const result = await userService.loginWithOTP(identifier);
            res.status(200).json({
                success: true,
                ...result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    verifyLogin: async (req, res) => {
        try {
            const { userId, otp } = req.body;
            
            if (!userId || !otp) {
                return res.status(400).json({
                    success: false,
                    message: "User ID and OTP are required"
                });
            }

            const result = await userService.verifyLogin(userId, otp);
            res.status(200).json({
                success: true,
                ...result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = userController; 