#!/bin/bash
set -e
cdk bootstrap
cdk deploy --require-approval never DevelopmentStack
aws cloudformation describe-stacks --stack-name DevelopmentStack --query "Stacks[0].Outputs" > /output/outputs.json
GITHUB_ARN=$(jq -cr ".[] | select(.OutputKey | contains(\"githublambda\")) | .OutputValue" /output/outputs.json)
SO_ARN=$(jq -cr ".[] | select(.OutputKey | contains(\"stackoverflowlambda\")) | .OutputValue" /output/outputs.json)
echo $GITHUB_ARN
echo $SO_ARN
aws lambda invoke --function-name $GITHUB_ARN /tmp/out
aws lambda invoke --function-name $SO_ARN /tmp/out