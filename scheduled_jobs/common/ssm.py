import boto3
import os

localstack_host = os.getenv('LOCALSTACK_HOSTNAME')
endpoint = f"http://{localstack_host}:4566" if localstack_host else None
ssm = boto3.client('ssm', endpoint_url=endpoint)

def get_secret(name):
    resp = ssm.get_parameter(Name=name, WithDecryption=True)
    return resp['Parameter']['Value']