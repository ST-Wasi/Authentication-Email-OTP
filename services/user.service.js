const Models = require("../models");
const { generateOTP } = require("../utils/generateOtp");
const { verifyOTP } = require("../utils/verifyOtp");
const { sendOTPEmail } = require("../utils/emailService");
const { MESSAGES } = require("../constants/messages");

const userService = {
  registerUser: async (userData) => {
    try {
      const existingUser = await Models.User.findOne({
        $or: [
          { email: userData.email },
          { phone: userData.phone }
        ]
      });

      if (existingUser) {
        if (existingUser.isVerified) {
          throw new Error(MESSAGES.USER_EXISTS);
        }
        const otp = generateOTP();
        existingUser.otp = {
          code: otp,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        };
        await existingUser.save();
        
        await sendOTPEmail(existingUser.email, otp);
        
        return {
          message: MESSAGES.OTP_SENT_EMAIL,
          userId: existingUser._id
        };
      }

      const otp = generateOTP();
      const user = new Models.User({
        ...userData,
        otp: {
          code: otp,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        }
      });

      await user.save();
      
      await sendOTPEmail(user.email, otp);

      return {
        message: MESSAGES.USER_REGISTERED,
        userId: user._id
      };
    } catch (error) {
      throw error;
    }
  },

  verifyRegistration: async (userId, otpCode) => {
    try {
      const user = await Models.User.findById(userId);
      if (!user) {
        throw new Error(MESSAGES.USER_NOT_FOUND);
      }

      if (user.isVerified) {
        throw new Error(MESSAGES.USER_ALREADY_VERIFIED);
      }

      const isValid = verifyOTP(otpCode, user.otp.code, user.otp.expiresAt);
      if (!isValid) {
        throw new Error(MESSAGES.INVALID_OTP);
      }

      user.isVerified = true;
      user.otp = undefined;
      await user.save();

      return {
        message: MESSAGES.USER_VERIFIED,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      };
    } catch (error) {
      throw error;
    }
  },

  loginWithOTP: async (identifier) => {
    try {
      const user = await Models.User.findOne({
        $or: [
          { email: identifier },
          { phone: identifier }
        ]
      });

      if (!user) {
        throw new Error(MESSAGES.USER_NOT_FOUND_REGISTER);
      }

      if (!user.isVerified) {
        throw new Error(MESSAGES.VERIFY_ACCOUNT);
      }

      const otp = generateOTP();
      user.otp = {
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) 
      };
      await user.save();

      await sendOTPEmail(user.email, otp);

      return {
        message: MESSAGES.OTP_SENT_EMAIL,
        userId: user._id
      };
    } catch (error) {
      throw error;
    }
  },

  verifyLogin: async (userId, otpCode) => {
    try {
      const user = await Models.User.findById(userId);
      if (!user) {
        throw new Error(MESSAGES.USER_NOT_FOUND);
      }

      const isValid = verifyOTP(otpCode, user.otp.code, user.otp.expiresAt);
      if (!isValid) {
        throw new Error(MESSAGES.INVALID_OTP);
      }

      user.otp = undefined;
      await user.save();

      return {
        message: MESSAGES.LOGIN_SUCCESSFUL,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = userService;
