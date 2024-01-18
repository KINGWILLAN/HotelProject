import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import keys from "../config/keys.js";
import User from "../models/userModel.js";
const tokenSecret = keys.TOKEN_SECRET;

export const authMiddleware = async (req, res, next) => {
  try {
    // if no authorization header
    if (!req.headers?.authorization) {
      throw createHttpError.Unauthorized("Please Authenticate");
    }

    const token = req.headers.authorization.replace("Bearer ", "").trim();
    // If not a valid token format
    if (!token) {
      throw createHttpError.Unauthorized("Please Authenticate");
    }
    const decoded = await jwt.verify(token, tokenSecret);
    // if not a valid token
    if (!decoded) {
      throw createHttpError.Unauthorized("Please Authenticate.");
    }
    // search for user in the database
    const user = await User.findById(decoded._id);

    if (!user) {
      throw createHttpError.Unauthorized("Please Authenticate.");
    }

    req.user = user;
    next();
  } catch (error) {
    // if no authorization header
    if (!req.headers?.authorization) {
      next(createHttpError.Unauthorized("Please Authenticate"));
      return;
    }
    const userToken = req.headers.authorization.replace("Bearer ", "").trim();

    if (userToken) {
      const data = await jwt.verify(userToken, tokenSecret, {
        ignoreExpiration: true,
      });

      const user = await User.findById(data._id);

      if (!user || !user.tokens.length) {
        next(createHttpError.Unauthorized("Please Authenticate."));
      }
      const tokenId = user?.tokens?.findIndex(
        (token) => token.token === userToken
      );
      if (user && tokenId > -1) {
        user.tokens.splice(tokenId, 1);
        await user.save();
        next(createHttpError.Unauthorized("Please Authenticate."));
      } else {
        next(createHttpError.Unauthorized("Please Authenticate."));
      }
    } else {
      next(createHttpError.Unauthorized("Please Authenticate."));
    }
  }
};
