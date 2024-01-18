/* eslint-disable no-useless-catch */
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import keys from "../config/keys.js";
import { expiresIn } from "../utils/sharedVar.js";
import createHttpError from "http-errors";

const saltRounds = Number(keys.SALT_ROUNDS);
const tokenSecret = keys.TOKEN_SECRET;

function validation(value) {
  return validator.isEmail(value);
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      validate: [validation, "Valid Email required."],
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    name: String,
    registrationNumber: String,
    country: String,
    state: String,
    city: String,
    location: {
      lat: Number,
      long: Number,
    },
    accountType: {
      type: String,
      default: "user",
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
  } catch (error) {
    throw error;
  }
});

// Generate Auth token for user
userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;
    // Generate Auth token for user
    const userObject = user;
    const id = userObject._id.toString();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject._id;
    const token = await jwt.sign(
      {
        _id: id,
        email: userObject.email,
        isVerified: userObject.isVerified,
        accountType: userObject.accountType,
      },
      tokenSecret,
      { expiresIn }
    );

    // save the authToken to db
    user.tokens = user.tokens.concat({ token });
    const savedToken = await user.save();
    if (!savedToken) {
      throw createHttpError.InternalServerError("Please Authenticate");
    }
    return token;
  } catch (error) {
    return error;
  }
};

// FindByCredentials - find user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError.Unauthorized("Please Authenticate");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createHttpError.Unauthorized("Please Authenticate");
  }
  return user;
};

// findOrCreate
userSchema.statics.findOrCreate = async (email) => {
  try {
    // Check if an existing email is in the DB
    let user = await User.findOne({ email });
    if (user) {
      return user;
    }
    // Create a new user in the DB.
    user = await User.create({ email });
    return user;
  } catch (error) {
    return error;
  }
};

// Delete confidential fields
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

const User = model("User", userSchema);

export default User;
