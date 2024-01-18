import createHttpError from "http-errors";
import User from "../models/userModel.js";
import { sendVerificationCode } from "../services/emailConfig.js";
import Verification from "../models/verificationModel.js";

export const createUser = async (req, res, next) => {
  try {
    var data = req.body;
    const user = new User(data);
    const savedUser = await user.save();
    if (savedUser) {
      await sendVerificationCode(savedUser.email);
      res.status(201).json({
        message: "user successfully saved to the database.",
        user: savedUser,
      });
    }
  } catch (error) {
    if (error.name.toLowerCase().includes("mongo")) {
      if (error.message.toLowerCase().includes("dup")) {
        next(createHttpError.Unauthorized("email " + data.email + " exist."));
      }
    }

    if (error.name.includes("ValidationError")) {
      next(createHttpError.BadRequest(error.message));
    }
    next(error);
  }
};

export const resendVerificationCode = async (req, res, next) => {
  try {
    const email = req.query.email;
    // const user = await User.findOne({ email });
    const verificationSent = await sendVerificationCode(email);
    console.log(verificationSent, " to ", email);
    res.status(201).json({
      message: "Code sent, Please check your email.",
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (user) {
      const token = await user.generateAuthToken();
      if (token) {
        res.status(200).send({ user, token });
      }
    }
  } catch (error) {
    next(createHttpError(error));
  }
};

export const currentUser = async (req, res, next) => {
  try {
    if (req.user) {
      res.status(200).json({ user: req.user });
    } else {
      throw createHttpError.Unauthorized("Please Authenticate.");
    }
  } catch (error) {
    next(createHttpError.Unauthorized("Please Authenticate"));
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const { code, email } = req.query;
    //verify code in the database;
    const user = await Verification.findCodeAndVerify(code, email);
    if (user) {
      const token = await user.generateAuthToken();

      res.status(201).send({ user, token });
    } else {
      next(createHttpError.Unauthorized("Please Verify your email."));
    }
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    if (req.user) {
      const currentToken = req.headers.authorization.replace("Bearer ", "");
      req.user.tokens = req.user.tokens.filter(
        (token) => token.token !== currentToken
      );
      await req.user.save();
      res.status(200).json({ message: "User logged Out" });
    } else {
      res.status(200).json({ message: "Please re login" });
    }
  } catch (error) {
    next(error);
  }
};

export const completeRegistration = async (req, res, next) => {
  try {
    const data = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...data,
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      throw createHttpError.InternalServerError("Error Saving data.");
    }
    const token = await updatedUser.generateAuthToken();
    res.status(201).json({ user: updatedUser, token });
  } catch (error) {
    next(error);
  }
};
