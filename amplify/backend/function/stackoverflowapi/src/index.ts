const awsServerlessExpress = require('aws-serverless-express');
const api = require('./app');

const server = awsServerlessExpress.createServer(api);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  awsServerlessExpress.proxy(server, event, context);
};
