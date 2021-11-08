<template>
  <div class="column is-flex is-flex-direction-column is-11" style="width: 100%;">
    <div>
      <div class="is-flex is-justify-content-space-between">
        <div>
          <a :href="repo.url">
            <span class="icon-text is-size-4 is-size-6-mobile">
              {{ repo.nameWithOwner.split('/')[0] }}/<wbr>{{ repo.nameWithOwner.split('/')[1] }}
            </span>
          </a>
        </div>
        <div class="ml-3 has-text-right is-size-5 is-size-6-mobile">
          <div>
            <span class="icon-text is-flex-wrap-nowrap">
              <span class="icon" style="color: orange">
                <i class="fas fa-star"></i>
              </span>
              <span>{{repo.stargazers.totalCount}}</span>
            </span>
          </div>
          <span v-if="repo.primaryLanguage" :style="{color: repo.primaryLanguage.color}">{{repo.primaryLanguage.name}}</span>
          <span v-else>Unknown</span>

        </div>
      </div>
    </div>
    <div class="is-11 column">
      <p class="mb-5 is-size-5 is-size-6-mobile">{{repo.description}}</p>
      <div v-if="pulls" class="is-11 is-flex is-flex-direction-column column">
        <span class="icon-text is-flex-wrap-nowrap mb-5 is-size-5 is-size-7-mobile" v-for="pull in pulls" :key="pull.number">
          <span class="icon">
            <i class="fas fa-code-branch"></i>
          </span>
          <span><a :href="pull.url">#{{pull.number}}</a> - <span>{{pull.title}}</span></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue';

import {
  GithubRepository, GithubPullRequest
} from '../types/GithubData'

export default defineComponent({
  name: 'Repo',
  props: {
    repo: {
      type: Object as () => GithubRepository,
      required: true
    },
    pulls: {
      type: Object as () => GithubPullRequest[],
      required: true
    }
  }
});
</script>