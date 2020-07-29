const AWS = require('aws-sdk')

class SES {

  ses: any

  constructor() {
    this.ses = new AWS.SES({apiVersion: '2014-11-06', region: 'us-east-1'})
  }

  async sendEmail(subject: string, body: string, sender: string) {
    const params = {
      Destination: {
        ToAddresses: [
          'david.j.bramwell@googlemail.com'
        ]
      },
      Message: {
        Body: {
          Text: {
           Charset: "UTF-8",
           Data: 'From: ' + sender + '\n\n' + body
          }
         },
         Subject: {
          Charset: 'UTF-8',
          Data: subject
         }
        },
      Source: 'dbramwell@stephenbmorrisey.com',
      ReplyToAddresses: [
         sender
      ],
    };

    try {
      await this.ses.sendEmail(params).promise();
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

export default new SES()