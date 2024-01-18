import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import keys from "../config/keys.js";
import { expiresIn } from "../utils/sharedVar.js";
import bcrypt from "bcryptjs";
import createHttpError from "http-errors";

const tokenSecret = keys.TOKEN_SECRET;
const saltRounds = keys.SALT_ROUNDS;

const companySchema = new Schema({
  companyEmail: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  companyName: String,
  companyId: String,
  companyCountry: String,
  companyState: String,
  companyCity: String,
  companyExactLocation: {
    lat: Number,
    long: Number,
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
});

companySchema.pre("save", async function (next) {
  const company = this;
  if (company.isModified("password")) {
    company.password = await bcrypt.hash(company.password, saltRounds);
  }
  next();
});

// Generate Auth token for user
companySchema.methods.generateAuthToken = async function () {
  try {
    const company = this;
    const {
      companyEmail,
      _id,
      companyName,
      companyId,
      companyCountry,
      companyCity,
      companyState,
      companyExactLocation,
      tokens,
    } = company;
    // Generate Auth token for user
    const token = await jwt.sign(
      {
        _id: _id.toString(),
        companyEmail,
        companyName,
        companyId,
        companyCountry,
        companyCity,
        companyState,
        companyExactLocation,
      },
      tokenSecret,
      { expiresIn }
    );

    // save the authToken to db
    company.tokens = tokens.concat({ token });
    const savedToken = await company.save();
    if (!savedToken) {
      throw createHttpError.InternalServerError("Please Authenticate");
    }
    return token;
  } catch (error) {
    return error;
  }
};

// FindByCredentials - find user by email and password
companySchema.statics.findByCredentials = async (email, password) => {
  const company = await Company.findOne({ email });
  if (!company) {
    throw createHttpError.Unauthorized("Please Authenticate");
  }

  const isMatch = await bcrypt.compare(password, company.password);
  if (!isMatch) {
    throw createHttpError.Unauthorized("Please Authenticate");
  }
  return company;
};

const Company = model("Company", companySchema);
export default Company;
