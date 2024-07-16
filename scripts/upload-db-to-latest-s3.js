const { uploadDBToS3 } = require("./upload-db-to-s3.js");
require('dotenv').config()

const uploadDBToLatestS3 = async () => {
  try {
    await uploadDBToS3('latest');

    console.log('File deployed successfully to latst');
  } catch (error) {
    console.error('Error downloading file:', error);
  } finally {
    process.exit(0);
  }
};

uploadDBToLatestS3();
