import { Schema, model } from "mongoose";
import validator from "validator";
import User from "./userModel.js";

const expiresIn = 1000 * 60 * 30;

const verificationSchema = new Schema({
  code: { type: Number, require: true, index: true },
  email: {
    type: String,
    required: true,
    validate: [(value) => validator.isEmail(value), "provide a valid Email."],
  },
  expiresAt: {
    type: Date,
    default: Date.now() + expiresIn,
  },
});

verificationSchema.statics.updateOrCreate = async function (code, userEmail) {
  let verification = await Verification.findOne({ email: userEmail });
  if (verification) {
    verification.code = code;
    verification.expiresAt = Date.now() + expiresIn;
    const newVerification = await verification.save();
    return newVerification;
  }
  verification = new Verification({
    code,
    email: userEmail,
  });
  const newVerification = await verification.save();
  return newVerification;
};

verificationSchema.statics.findCodeAndVerify = async function (
  code,
  userEmail
) {
  // find code in db
  const codeExist = await Verification.findOne({ code });
  console.log(codeExist);
  if (codeExist) {
    // checks if user owns the code and it hasn't expired
    const canContinue =
      codeExist.email === userEmail && codeExist.expiresAt > Date.now();
    if (!canContinue) {
      throw "Please regenerate code or authenticate";
    }
    const user = await User.findOne({ email: codeExist.email });
    user.isVerified = true;
    await user.save();
    await Verification.deleteOne({ code });
    return user;
  }
};

const Verification = model("Verification", verificationSchema);

export default Verification;
