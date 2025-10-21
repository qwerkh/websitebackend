import {Meteor} from "meteor/meteor";
import {PutObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {s3Client} from "../lib/s3Client";
import {Constants} from "../../imports/libs/constant.js";

// Imports your configured client and any necessary S3 commands.

let secret = Meteor.settings.private.secret;
Meteor.methods({
    async do_getUploadUrlDigitalOcean(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                const {type, count, mimeType, path} = doc;
                let bucket;

                bucket = Constants.SPACES_IMAGE_BUCKET;
                let dataList = [];
                for (let i = 1; i <= (count || 1); i++) {
                    let filename = doc.fileName || ((Math.random() + 1).toString(36).substring(2));
                    const key = path ? path + "/" + `${Date.now()}_${filename}` : `${Date.now()}_${filename}`;
                    // Specifies path, file, and content type.
                   /* const bucketParams = {
                        Bucket: bucket,
                        Key: key,
                        ContentType: mimeType,
                        ACL: "public-read",
                    };*/
                    const command = new PutObjectCommand({
                        Bucket: bucket,
                        Key: key,
                        ContentType: mimeType,
                        ACL: "public-read",
                    });
                    const uploadUrl = await getSignedUrl(
                        s3Client,
                        command,
                        {expiresIn: 15 * 60}
                    ); // Adjustable expiration.
                    const cdnLink = `https://${bucket}.sgp1.cdn.digitaloceanspaces.com/${key}`;
                    /*const data = {
                        uploadUrl,
                        cdnLink,
                    };*/
                    dataList.push({uploadUrl, cdnLink})
                }

                return dataList;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    }

});
