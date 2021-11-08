export interface GithubData {
  data: {
    viewer: GithubViewer
  }
}

export interface GithubViewer {
  avatarUrl: URL
  bio: string
  login: string
  name: string
  repositories: {
    nodes: [GithubRepository]
  }
  pullRequests: {
    nodes: [GithubPullRequest]
  }
}

export interface GithubRepository {
  description: string
  isPrivate: boolean
  nameWithOwner: string
  primaryLanguage: GithubLanguage
  stargazers: {
    totalCount: number
  }
  url: URL
}

export interface GithubLanguage {
  color: string
  name: string
}

export interface GithubPullRequest {
  closedAt: Date
  mergedAt: Date
  number: number
  title: string
  url: URL
  baseRepository: GithubPullRequestRepository
}

export interface GithubPullRequestRepository extends GithubRepository {
  name: string
  owner: {
    login: string
  }
  primaryLanguage: GithubLanguage
  viewerCanAdminister: boolean
}