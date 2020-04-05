import { GraphQLClient } from 'graphql-request'
import parameterStore from './parameterStore'
import {PullRequest, GithubResponse, RepositoryContributedTo} from '../../../../../src/types';

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

  async getData() {
    await this.initialise()

    const query = `{
      viewer {
        avatarUrl
        bio
        name
        repositories(first: 100, orderBy: {
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
        repositoriesContributedTo(first: 100, contributionTypes: [COMMIT]) {
          nodes {
            nameWithOwner
          }
        }
        pullRequests(first: 100, orderBy: {
          field: CREATED_AT,
          direction: DESC
        }) {
          nodes {
            title
            mergedAt
            closedAt
            url
            number
            baseRepository {
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
      data.viewer.pullRequests.nodes = this.filterUnwantedPulls(data.viewer.pullRequests.nodes, data.viewer.repositoriesContributedTo.nodes)
      return data.viewer
    } catch (e) {
      console.log(e)
    }
  }

  filterUnwantedPulls(pulls: PullRequest[], reposContributedTo: RepositoryContributedTo[]) {
    return pulls.filter(it => {
      return (it.mergedAt || reposContributedTo.find(repo => repo.nameWithOwner === it.baseRepository.nameWithOwner)) &&
             !it.baseRepository.isPrivate &&
             !it.baseRepository.nameWithOwner.includes('dbramwell')
    })
  }
}

export default new GithubApi()