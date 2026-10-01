const {
    S3Client
} = require("@aws-sdk/client-s3");

const {
    fromIni
} = require("@aws-sdk/credential-providers");

const s3 = new S3Client({
    region: "us-east-1",
    credentials: fromIni({
        profile: "clouddocs-dev"
    })
});

module.exports = s3;