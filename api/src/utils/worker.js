import Verification from "../models/verificationModel.js";

setInterval(async () => {
  console.log("Here in Server.js");
  await Verification.deleteMany({ expiresAt: { $lte: Date.now() } });
}, 1000 * 60 * 31);
