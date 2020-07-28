import { GraphQLClient } from 'graphql-request'
import parameterStore from './parameterStore'
import {PullRequest, GithubResponse, MentionableUsersResponse} from '../../../../../src/types';

const url = "https://api.github.com/graphql"

class GithubApi {

  client: GraphQLClient

  async initialise() {
    if (!this.client) {
      try {
        const githubApiToken = await parameterStore.getParameter('github-api')
        this.client = new GraphQLClient(url, {
          headers: {
            Authorization: `bearer ${githubApiToken}`,
          },
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  async getData(after = null) {
    await this.initialise()

    const query = `{
      viewer {
        avatarUrl
        bio
        name
        login
        repositories(first: 100, privacy: PUBLIC, orderBy: {
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
        pullRequests(first: 100, states: [CLOSED, OPEN, MERGED], ${after ? `after: "${after}",` : ''} orderBy: {
          field: CREATED_AT,
          direction: DESC
        }) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            title
            mergedAt
            closedAt
            url
            number
            baseRepository {
              name
              owner {
                login
              }
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
    }`

    try {
      const data = await this.client.request(query) as {viewer: GithubResponse}
      data.viewer.pullRequests.nodes = await this.filterUnwantedPulls(data.viewer.pullRequests.nodes, data.viewer.name, data.viewer.login)
      return data.viewer
    } catch (e) {
      console.log(e)
    }
  }

  async filterUnwantedPulls(pulls: PullRequest[], name: string, login: string) {
    const wantedPulls = []
    for (let i = 0; i < pulls.length; i++) {
      const it = pulls[i];
      if (it.mergedAt || await this.checkIfMentionable(it.baseRepository.name, it.baseRepository.owner.login, name)) {
        if (it.baseRepository.owner.login !== login) wantedPulls.push(it)
      }
    }
    return wantedPulls
  }

  async checkIfMentionable(name: string, owner: string, userName: string) {
    const mentionable = (after = null) => `
    {
      repository(name: "${name}", owner: "${owner}") {
        mentionableUsers(first: 100${after ? `, after: "${after}"` : ''}) {
          nodes {
            name
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }`

    try {
      let data = await this.client.request(mentionable()) as MentionableUsersResponse
      while (data.repository.mentionableUsers.pageInfo.hasNextPage && !data.repository.mentionableUsers.nodes.some(it => it.name === userName)) {
        const more = await this.client.request(mentionable(data.repository.mentionableUsers.pageInfo.endCursor)) as MentionableUsersResponse
        data = more
      }
      return data.repository.mentionableUsers.nodes.some(it => it.name === userName)
    } catch (e) {
      console.log(e)
    }

  }
}

export default new GithubApi()