const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { DATABASE_PATH, s3  } = require('./variables.js');
const { promisify } = require('util');
const { pipeline } = require('stream');
const fs = require('fs');
require('dotenv').config()

const getLatestDBFromS3 = async () => {
  try {
    await delay(3000);

    const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_SQLITE, Key: `devluk-sqlite-latest.db` });
    const response = await s3.send(command);

    if (!fs.existsSync('.tmp')){
      fs.mkdirSync('.tmp');
    }

    // Stream the S3 object to a file
    const streamPipeline = promisify(pipeline);
    await streamPipeline(response.Body, fs.createWriteStream(DATABASE_PATH));

    console.log('File downloaded successfully to:', DATABASE_PATH);

  } catch (error) {
    console.error('Error downloading file:', error);
  } finally {
    process.exit(0);
  }
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

getLatestDBFromS3();
