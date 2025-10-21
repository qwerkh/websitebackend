import { S3 } from "@aws-sdk/client-s3/";
import { Constants } from "../../imports/libs/constant";

const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: Constants.SPACES_END_POINT,
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: Constants.SPACES_KEY,
    secretAccessKey: Constants.SPACES_SECRET,
  },
});

export { s3Client };
