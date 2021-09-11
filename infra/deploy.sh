#!/bin/bash
cdklocal bootstrap
cdklocal deploy DevelopmentStack
awslocal cloudformation describe-stacks --stack-name DevelopmentStack --query "Stacks[0].Outputs" > /output/outputs.json