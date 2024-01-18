import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  AWS_SES_ACCESS_KEY: process.env.AWS_SES_ACCESS_KEY,
  AWS_SES_SECRET_ACCESS_KEY: process.env.AWS_SES_SECRET_ACCESS_KEY,
  AWS_SES_REGION: process.env.AWS_SES_REGION,
  AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACESS_KEY,
  AWS_S3_ARN: process.env.AWS_S3_ARN,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  CLIENT_URL: process.env.CLIENT_URL,
};
