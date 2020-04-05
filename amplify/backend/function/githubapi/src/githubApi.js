"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const parameterStore_1 = require("./parameterStore");
const url = "https://api.github.com/graphql";
class GithubApi {
    async initialise() {
        if (!this.client) {
            try {
                const githubApiToken = await parameterStore_1.default.getParameter('github-api');
                this.client = new graphql_request_1.GraphQLClient(url, {
                    headers: {
                        Authorization: `bearer ${githubApiToken}`,
                    },
                });
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    async getData() {
        await this.initialise();
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
    }`;
        try {
            const data = await this.client.request(query);
            data.viewer.pullRequests.nodes = this.filterUnwantedPulls(data.viewer.pullRequests.nodes, data.viewer.repositoriesContributedTo.nodes);
            return data.viewer;
        }
        catch (e) {
            console.log(e);
        }
    }
    filterUnwantedPulls(pulls, reposContributedTo) {
        return pulls.filter(it => {
            return (it.mergedAt || reposContributedTo.find(repo => repo.nameWithOwner === it.baseRepository.nameWithOwner)) &&
                !it.baseRepository.isPrivate &&
                !it.baseRepository.nameWithOwner.includes('dbramwell');
        });
    }
}
exports.default = new GithubApi();
