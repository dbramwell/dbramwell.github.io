#!/bin/bash
cdklocal bootstrap
cdklocal deploy --require-approval never DevelopmentStack
awslocal cloudformation describe-stacks --stack-name DevelopmentStack --query "Stacks[0].Outputs" > /output/outputs.json
GITHUB_ARN=$(jq -cr ".[] | select(.OutputKey | contains(\"githublambda\")) | .OutputValue" /output/outputs.json)
SO_ARN=$(jq -cr ".[] | select(.OutputKey | contains(\"stackoverflowlambda\")) | .OutputValue" /output/outputs.json)
echo $GITHUB_ARN
echo $SO_ARN
awslocal lambda invoke --function-name $GITHUB_ARN /tmp/out
awslocal lambda invoke --function-name $SO_ARN /tmp/out