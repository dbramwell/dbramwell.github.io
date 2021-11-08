import json
import os
import requests
from github_queries import my_info, pull_requests_query, mentionable_users_query
from common.s3 import write_data
from common.ssm import get_secret

url = "https://api.github.com/graphql"
github_token = get_secret('GITHUB_TOKEN')
headers = {'Authorization': f'bearer {github_token}'}

def query_github(query):
    r = requests.post(url, json={'query': query}, headers=headers)
    return r.json()

def get_my_info():
    m_i = query_github(my_info)
    popular_repos = []
    for node in m_i['data']['viewer']['repositories']['nodes']:
        if node['stargazers']['totalCount'] >= 10:
            popular_repos.append(node)
    m_i['data']['viewer']['repositories']['nodes'] = popular_repos
    return m_i

def get_my_contributions():
    data = query_github(pull_requests_query())
    while data['data']['viewer']['pullRequests']['pageInfo']['hasNextPage']:
        end = data['data']['viewer']['pullRequests']['pageInfo']['endCursor']
        d2 = query_github(pull_requests_query(end))
        d2['data']['viewer']['pullRequests']['nodes'] += data['data']['viewer']['pullRequests']['nodes']
        data = d2

    popular_pulls = []
    
    for node in data['data']['viewer']['pullRequests']['nodes']:
        stargazers = node['baseRepository']['stargazers']['totalCount']
        am_admin = node['baseRepository']['viewerCanAdminister']
        if stargazers >= 10 and not am_admin:
            name = node['baseRepository']['name']
            owner = node['baseRepository']['owner']['login']
            is_contributer = bool(node['mergedAt'])
            end_cursor = None
            while not is_contributer:
                query = mentionable_users_query(name, owner, cursor=end_cursor)
                users = query_github(query)
                nodes = users["data"]["repository"]["mentionableUsers"]["nodes"]
                is_contributer = any(node["isViewer"] for node in nodes)
                page_info = users["data"]["repository"]["mentionableUsers"]["pageInfo"]
                if page_info["hasNextPage"]:
                    end_cursor = page_info["endCursor"]
                else:
                    break

            if is_contributer:
                popular_pulls.append(node)

    data['data']['viewer']['pullRequests']['nodes'] = popular_pulls
    return data

def handler(event, context):
    data = get_my_info()
    data['data']['viewer'].update(get_my_contributions()['data']['viewer'])
    write_data(json.dumps(data), os.getenv('BUCKET_NAME'), os.getenv('GITHUB_FILE'))
