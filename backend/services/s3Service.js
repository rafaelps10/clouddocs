const {
    PutObjectCommand
} = require("@aws-sdk/client-s3");

const s3 = require("../config/s3");

const BUCKET_NAME = "clouddocs-rafael-2026";

const uploadFile = async ({
    key,
    body,
    contentType
}) => {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: contentType
    });

    const response = await s3.send(command);

    return response;
};

module.exports = {
    uploadFile
};