const awsServerlessExpress = require('aws-serverless-express');
const serverConf = require('./app');

const server = awsServerlessExpress.createServer(serverConf);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  awsServerlessExpress.proxy(server, event, context);
};