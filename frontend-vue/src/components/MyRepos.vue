<template>
  <repo-list :repos="repos" header="Popular Repositories"/>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue';

import {
  GithubRepository
} from '../types/GithubData'

import RepoList from './RepoList.vue';

export default defineComponent({
  name: 'MyRepos',
  components: { RepoList },
  props: {
    repos: {
      type: Object as () => [GithubRepository],
      required: true
    }
  }
});
</script>