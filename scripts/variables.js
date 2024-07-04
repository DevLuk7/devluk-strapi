const { S3Client } = require("@aws-sdk/client-s3");
const path = require('path');
require('dotenv').config()

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
  },
});

const DATABASE_PATH = path.join(__dirname, '../.tmp/data.db');

module.exports = { s3, DATABASE_PATH };
