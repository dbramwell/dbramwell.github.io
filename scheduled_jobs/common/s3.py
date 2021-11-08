import boto3
import os

localstack_host = os.getenv('LOCALSTACK_HOSTNAME')
endpoint = f"http://{localstack_host}:4566" if localstack_host else None
s3 = boto3.client('s3', endpoint_url=endpoint)

def write_data(body, bucket, key):
    s3.put_object(Body=body, Bucket=bucket, Key=key)