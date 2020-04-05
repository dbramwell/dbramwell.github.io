export interface PullRequest {
  title: string
  mergedAt: string | null
  closedAt: string | null
  url: string
  number: number
  baseRepository: Repository
}

export interface GithubResponse {
  avatarUrl: string
  bio: string
  name: string
  repositories: {
    nodes: Repository[]
  }
  pullRequests: {
    nodes: PullRequest[]
  }
  repositoriesContributedTo: {
    nodes: RepositoryContributedTo[]
  }
}

export interface Repository {
  nameWithOwner: string
  description: string
  isPrivate: boolean
  url: string
  primaryLanguage: {
    color: string
    name: string
  }
  stargazers: {
    totalCount: number
  }
}

export interface RepositoryContributedTo {
  nameWithOwner: string
}

export interface StackOverflowResponse {
  reputation: number
  topAnswers: TopAnswer[]
}

export interface TopAnswer {
  date: number
  link: string
  score: number
  accepted: boolean
  question: string
  tags: string[]
}

export interface GithubColours {
  [key: string]: string
}