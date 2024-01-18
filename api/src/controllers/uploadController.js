import AWS from "aws-sdk";
import { v4 as uuid4 } from "uuid";
import keys from "../config/keys.js";
const {
  AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_ACCESS_KEY,
  AWS_S3_REGION,
  AWS_S3_BUCKET_NAME,
} = keys;
AWS.config.update({ region: AWS_S3_REGION });

const s3 = new AWS.S3({
  accessKeyId: AWS_S3_ACCESS_KEY,
  secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

export const serviceImageUpload = async (req, res, next) => {
  try {
    const { fileType } = req.body;
    // const contentType = "image/jpeg";
    const contentType = fileType;
    // const extension = file.type;
    const extension = contentType.split("/")[1];
    const key = `${req.user._id}/${uuid4()}.${extension}`;
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    };
    const url = await s3.getSignedUrlPromise("putObject", params);
    res.status(200).send({ url, key });
  } catch (error) {
    next(error);
  }
};
