AWSINFO="{\"prod\":\
{\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"default\"\
}}"

ENVINFO="{\
\"projectPath\": \"$(pwd)\",\
\"defaultEditor\": \"code\",\
\"envName\": \"prod\"\
}"

echo $AWSINFO > ./amplify/.config/local-aws-info.json
echo $ENVINFO > ./amplify/.config/local-env-info.json

echo "Amplify env set up"
