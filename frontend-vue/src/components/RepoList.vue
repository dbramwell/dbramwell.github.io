<template>
  <border-section :header="header">
    <div class="pt-4">
      <div class="pt-5 is-flex is-flex-direction-column is-align-items-center has-background-light" :class="{'has-background-white-bis': !(index % 2)}" v-for="(repo, index) in repos" :key="repo.nameWithOwner">
        <repo :repo="repo" :pulls="reposToPulls[repo.nameWithOwner]"/>
      </div>
    </div>
  </border-section>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType
} from 'vue';

import {
  GithubPullRequest
} from '../types/GithubData'

import Repo from './Repo.vue';
import BorderSection from './BorderSection.vue';

export default defineComponent({
  name: 'MyRepos',
  components: { Repo, BorderSection },
  props: {
    header: String,
    repos: {
      type: Array as PropType<Array<GithubPullRequest>>,
      default: () => []
    },
    reposToPulls: {
      type: Object as PropType<{ [key: string]: GithubPullRequest[]; }>,
      default: () => ({})
    }
  },
});
</script>