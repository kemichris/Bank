import * as authService from "../services/auth.service.js";
import ApiError from "../utils/apiError.utils.js";

export const register = async (req, res, next) => {
  try {
    const registration = await authService.register(req.body);

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const loggedIn = await authService.login(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: loggedIn,
    });
  } catch (error) {
    next(error);
  }
};

// forgot password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await authService.forgotPassword(email);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

// verify reset code
export const verifyResetCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const result = await authService.verifyResetCode(email, code);

    return res.status(200).json({
      success: true,
      message: "Verification successful.",
      resetToken: result.resetToken,
    });
  } catch (error) {
    next(error);
  }
};

// reset password
export const resetPassword = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Reset token is missing.");
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    } catch (error) {
      throw new ApiError(401, "Reset session has expired or is invalid.");
    }

    /*
            Make sure this token was specifically
            created for password resetting.
        */
    if (decoded.purpose !== "password-reset") {
      throw new ApiError(401, "Invalid reset token.");
    }

    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      throw new ApiError(400, "Password and confirm password are required.");
    }

    if (password !== confirmPassword) {
      throw new ApiError(400, "Passwords do not match.");
    }

    const result = await authService.resetPassword(decoded.id, password);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
