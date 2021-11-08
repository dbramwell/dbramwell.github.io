my_info = '''{
    viewer {
        avatarUrl
        bio
        name
        login
        repositories(first: 100, ownerAffiliations: [OWNER], privacy: PUBLIC, orderBy: {
            field: STARGAZERS,
            direction: DESC
        }) {
            nodes {
                nameWithOwner
                description
                isPrivate
                url
                stargazers {
                    totalCount
                }
                primaryLanguage {
                    color
                    name
                }
            }
        }
    }
}
'''

def format_after(cursor):
    return f', after: "{cursor}"' if cursor else ''

def pull_requests_query(cursor=None):
    after = format_after(cursor)
    return '''{{
        viewer {{
            pullRequests(first: 100{after}, states: [CLOSED, MERGED], orderBy: {{
                field: CREATED_AT,
                direction: DESC
            }}) {{
                pageInfo {{
                    endCursor
                    hasNextPage
                }}
                nodes {{
                    title
                    mergedAt
                    closedAt
                    url
                    number
                    baseRepository {{
                        name
                        owner {{
                            login
                        }}
                        viewerCanAdminister
                        nameWithOwner
                        description
                        isPrivate
                        url
                        stargazers {{
                            totalCount
                        }}
                        primaryLanguage {{
                            color
                            name
                        }}
                    }}
                }}
            }}
        }}
    }}'''.format(after=after)

def mentionable_users_query(name, owner, cursor=None):
    after = format_after(cursor)
    return '''{{
        repository(name: "{name}", owner: "{owner}") {{
            mentionableUsers(first: 100{after}) {{
                nodes {{
                    isViewer
                }}
                pageInfo {{
                    hasNextPage
                    endCursor
                }}
            }}
        }}
    }}'''.format(name=name, owner=owner, after=after)