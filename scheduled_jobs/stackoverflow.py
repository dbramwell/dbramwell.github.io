import json
import os
import requests
from github_queries import my_info, pull_requests_query, mentionable_users_query
from common.s3 import write_data
from common.ssm import get_secret

stackoverflow_user = get_secret('STACKOVERFLOW_USER')
url = f"https://api.stackexchange.com/2.2/users/{stackoverflow_user}/answers?site=stackoverflow&sort=votes&pagesize=10"

def query():
    r = requests.get(url)
    return r.json()

def handler(event, context):
    data = query()
    write_data(json.dumps(data), os.getenv('BUCKET_NAME'), os.getenv('STACKOVERFLOW_FILE'))
