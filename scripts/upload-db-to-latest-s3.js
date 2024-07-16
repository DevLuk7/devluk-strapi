const { DATABASE_PATH  } = require('./variables.js');
const { uploadDBToS3 } = require("./upload-db-to-s3.js");
require('dotenv').config()

const uploadDBToLatestS3 = async () => {
  try {
    uploadDBToS3('latest');

    console.log('File deployed successfully to:', DATABASE_PATH);
  } catch (error) {
    console.error('Error downloading file:', error);
  } finally {
    process.exit(0);
  }
};

uploadDBToLatestS3();
