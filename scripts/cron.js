const cron = require('cron');
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const { s3, DATABASE_PATH } = require('./variables.js');
require('dotenv').config()

cron.CronJob.from({
	cronTime: '0 0 * * *',
	onTick: function () {
		uploadDBToS3('date')
	},
	start: true,
	timeZone: 'America/Los_Angeles'
});

const uploadDBToS3 = async (key) => {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_SQLITE,
      Key: `devluk-sqlite-${key === 'latest' ? 'latest' : new Date().toISOString()}.db`,
      Body: fs.readFileSync(DATABASE_PATH),
      ContentType: 'application/x-sqlite3'
    });
    const data = await s3.send(command);
    console.log("File uploaded successfully:", data);
  } catch (err) {
    console.error("Error uploading the file:", err);
  }
};
