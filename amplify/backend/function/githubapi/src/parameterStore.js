"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
class ParameterStore {
    constructor() {
        this.ssm = new AWS.SSM({ apiVersion: '2014-11-06' });
    }
    async getParameter(parameter) {
        const params = {
            Name: parameter
        };
        const data = await this.ssm.getParameter(params).promise();
        return data.Parameter.Value;
    }
}
exports.default = new ParameterStore();
