<template>
  <repo-list :repos="sortedRepos" :reposToPulls="reposToPulls" header="Contributions"/>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType
} from 'vue';

import {
  GithubPullRequest, GithubRepository
} from '../types/GithubData'

import RepoList from './RepoList.vue';

export default defineComponent({
  name: 'MyRepos',
  components: { RepoList },
  props: {
    pullRequests: {
      type: Array as PropType<Array<GithubPullRequest>>,
      default: () => []
    }
  },
  setup(props) {
    const repos = props.pullRequests.map(pull => pull.baseRepository)
    const uniqRepos = repos.filter((repo, i) => {
      return repos.findIndex(it => it.nameWithOwner === repo.nameWithOwner) === i
    })
    const sortedRepos = uniqRepos.sort(
      (a, b) => a.stargazers.totalCount < b.stargazers.totalCount ? 1 : -1)

    const reposToPulls: { [key: string]: GithubPullRequest[] } = {}
    sortedRepos.forEach((repo: GithubRepository) => {
      const filteredPulls = props.pullRequests.filter(pull => pull.baseRepository.nameWithOwner === repo.nameWithOwner)
      reposToPulls[repo.nameWithOwner] = filteredPulls
    })
    return {sortedRepos, reposToPulls};
  },
});
</script>