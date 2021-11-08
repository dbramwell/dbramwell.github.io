<template>
  <div class="columns is-mobile is-flex is-justify-content-center has-background-white-bis">
    <div class="column is-11-mobile is-11-tablet is-10-desktop">
      <heading
          :name="githubData.data.viewer.name"
          :avatarUrl="githubData.data.viewer.avatarUrl"
          :summary="githubData.data.viewer.bio"
          :stackoverflowRep="stackoverflowData.items[0].owner.reputation"
      ></heading>
      <my-repos :repos="githubData.data.viewer.repositories.nodes" />
      <contributions :pullRequests="githubData.data.viewer.pullRequests.nodes" />
    </div>
  </div>
</template>

<script lang="ts">
import Heading from './Heading.vue';
import MyRepos from './MyRepos.vue';
import Contributions from './Contributions.vue';
import outputs from '/output/outputs.json';
import { GithubData } from '../types/GithubData';
import { StackoverflowData } from '../types/StackoverflowData';
import { CDKOutput } from '../types/CDKOutputs';
import { defineComponent } from 'vue';

async function getData(
  path: string
): Promise<unknown> {
  const response = await fetch(path);
  return await response.json() as unknown;
}

function isGithubData(
  data: unknown
): data is GithubData {
  return typeof(data) === 'object' && data !== null && 'data' in data
}

function isStackoverflowData(
  data: unknown
): data is StackoverflowData {
  return typeof(data) === 'object' && data !== null && 'items' in data
}

async function getGithubData(
  url: string
): Promise<GithubData | null> {
  const data = await getData(url);
  if (data && isGithubData(data)) {
    return data;
  }
  return null;
}

async function getStackoverflowData(
  url: string
): Promise<StackoverflowData | null> {
  const data = await getData(url);
  if (data && isStackoverflowData(data)) {
    return data;
  }
  return null;
}

export default defineComponent({
  name: 'PageIndex',
  components: { Heading, MyRepos, Contributions },
  
  async setup() {
    const githubUrl = (outputs as CDKOutput[]).find(it => it.OutputKey === 'githubdataurl')?.OutputValue
    const stackoverflowUrl = (outputs as CDKOutput[]).find(it => it.OutputKey === 'stackoverflowdataurl')?.OutputValue
    let githubPromise
    let stackoverflowPromise
    if (githubUrl) {
      githubPromise = getGithubData(githubUrl)
    }
    if (stackoverflowUrl) {
      stackoverflowPromise = getStackoverflowData(stackoverflowUrl)
    }
    const [githubData, stackoverflowData] = await Promise.all([githubPromise, stackoverflowPromise])
    return {githubData, stackoverflowData};
  }
});
</script>
