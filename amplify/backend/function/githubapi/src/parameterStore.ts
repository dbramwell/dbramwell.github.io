const AWS = require('aws-sdk')

class ParameterStore {

  ssm: any

  constructor() {
    this.ssm = new AWS.SSM({apiVersion: '2014-11-06', region: 'us-east-1'})
  }

  async getParameter(parameter: string): Promise<string> {
    const params = {
      Name: parameter
    };

    const data = await this.ssm.getParameter(params).promise()
    return data.Parameter.Value
  }
}

export default new ParameterStore()