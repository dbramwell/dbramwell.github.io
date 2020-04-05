const nodeFetch = require("node-fetch");
const AWS = require('aws-sdk');
const baseUrl = "https://api.stackexchange.com/2.2/"
const site = "?site=stackoverflow"

const request = async (request: string, additionalQuery?: string) => {
  const response = await nodeFetch(`${baseUrl}${request}${site}${additionalQuery || ''}`);
  const json = await response.json();
  return json;
}

exports.handler = async function (event, context) {

  const answers = await request("users/1147618/answers", "&sort=votes&pagesize=10");
  const reputation = answers.items[0].owner.reputation

  const topAnswers = await Promise.all(answers.items.map(async it => {
    const question = await request("questions/" + it.question_id)
    return {
      score: it.score,
      accepted: it.is_accepted,
      question: question.items[0].title,
      tags: question.items[0].tags,
      date: it.last_activity_date,
      link: "https://stackoverflow.com/a/" + it.answer_id 
    }
  }))

  const obj = {
    reputation,
    topAnswers
  }

  console.log(JSON.stringify(obj))

  var params = {
    TableName : process.env.STORAGE_STACKOVERFLOW_NAME,
    Item: {
       key: 'data',
       data: obj
    }
  };
  
  var documentClient = new AWS.DynamoDB.DocumentClient();
  
  try {
    const result = await documentClient.put(params).promise();
    console.log(result);
  } catch (e) {
    console.log(e)
  }
  context.done(null, 'Success');
};
