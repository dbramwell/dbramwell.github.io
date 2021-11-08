from aws_cdk.core import Stack, Construct, CfnOutput, Duration
from aws_cdk.aws_lambda_python import PythonFunction
import aws_cdk.aws_lambda as lambda_
import aws_cdk.aws_s3 as s3
import os


class DevelopmentStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        dev = True
        if os.getenv('PRODUCTION'):
            dev = False

        data_bucket = s3.Bucket(self, 'Data')
        data_bucket.add_cors_rule(
            allowed_methods=[s3.HttpMethods.GET],
            allowed_origins=['*'],
            allowed_headers=['*']
        )

        github_data_file = 'github_data.json'
        stackoverflow_data = 'stack_overflow_data.json'

        github_environment = {
            "GITHUB_FILE": github_data_file,
            "BUCKET_NAME": data_bucket.bucket_name
        }
        if dev:
            github_environment["LOCALSTACK_HOSTNAME"] = os.getenv('LOCALSTACK_HOSTNAME')

        github_schedule_function = PythonFunction(self, 'github-data',
            entry='../scheduled_jobs',
            index='github.py',
            runtime=lambda_.Runtime.PYTHON_3_7,
            environment=github_environment,
            timeout=Duration.minutes(3),
        )
        data_bucket.grant_read_write(github_schedule_function)  

        stackoverflow_env = {
            "STACKOVERFLOW_FILE": stackoverflow_data,
            "BUCKET_NAME": data_bucket.bucket_name
        }
        if dev:
            stackoverflow_env["LOCALSTACK_HOSTNAME"] = os.getenv('LOCALSTACK_HOSTNAME')

        stackoverflow_schedule_function = PythonFunction(self, 'stackoverflow-data',
            entry='../scheduled_jobs',
            index='stackoverflow.py',
            runtime=lambda_.Runtime.PYTHON_3_7,
            environment=stackoverflow_env,
            timeout=Duration.minutes(3),
        )
        data_bucket.grant_read_write(stackoverflow_schedule_function)

        github_data_url = f"https://{data_bucket.bucket_name}.s3.amazonaws.com/{github_data_file}"
        stackoverflow_data_url = f"https://{data_bucket.bucket_name}.s3.amazonaws.com/{stackoverflow_data}"
        if dev:
            github_data_url = f"http://localhost:4566/{data_bucket.bucket_name}/{github_data_file}"
            stackoverflow_data_url = f"http://localhost:4566/{data_bucket.bucket_name}/{stackoverflow_data}"

        CfnOutput(self, 'github_data_url', value=github_data_url)
        CfnOutput(self, 'stackoverflow_data_url', value=stackoverflow_data_url)
        CfnOutput(self, 'github_lambda', value=github_schedule_function.function_arn)
        CfnOutput(self, 'stackoverflow_lambda', value=stackoverflow_schedule_function.function_arn)