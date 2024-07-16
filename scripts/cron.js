const cron = require('cron');
const { uploadDBToS3 } = require('./upload-db-to-s3.js');
require('dotenv').config()

cron.CronJob.from({
	cronTime: '0 0 * * *',
	onTick: function () {
		uploadDBToS3('date')
	},
	start: true,
	timeZone: 'America/Los_Angeles'
});
