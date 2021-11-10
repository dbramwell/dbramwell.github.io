<template>
  <div>
    <div id="header" class="columns is-flex is-flex-wrap-wrap">
      <div class="column is-3">
        <figure class="image is-128x128">
          <img :src="avatarUrl" class="is-rounded">
        </figure>
      </div>
      <div class="column is-flex is-flex-direction-column has-text-right is-align-items-flex-end">
        <h1 class="is-size-1 is-size-2-mobile">{{ name }}</h1>
        <h6 class="mb-4 is-size-4 is-size-5-mobile has-text-grey-light">
          Stack Overflow Reputation: 
          <a href="https://stackoverflow.com/users/1147618/dbramwell">{{stackoverflowRep}}</a>
        </h6>
        <h6 class="mb-4 is-size-4 is-size-5-mobile">
          <a href="./david_bramwell_cv.pdf">Download CV</a>
        </h6>
      </div>
    </div>
    <div class="ml-6 has-text-right">
      <h2 class="is-size-3 is-size-4-mobile">{{ summary }}</h2>
      <div class="is-size-2">
        <a href="https://stackoverflow.com/users/1147618/dbramwell">
          <i style="color: hsl(27,90%,55%);" class="mr-3 fab fa-stack-overflow"></i>
        </a>
        <a href="https://www.linkedin.com/in/david-bramwell-423b2136/">
          <i style="color: #0a66c2;" class="mr-3 fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/dbramwell">
          <i style="color: #000000;" class="fab fa-github-square"></i>
        </a>
      </div>
      <div class="is-flex is-justify-content-flex-end">
        <a href="https://www.credly.com/badges/bb4735ce-1d2d-4a57-a58c-8993e4b81f9a/public_url">
          <figure class="image is-128x128">
            <img src="../assets/AWS-Developer-Associate-2020.png">
          </figure>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue';

export default defineComponent({
  name: 'CompositionComponent',
  props: {
    name: {
      type: String,
      required: true
    },
    summary: {
      type: String
    },
    avatarUrl: {
      type: URL
    },
    stackoverflowRep: {
      type: Number
    }
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>

  #header {
    margin-bottom: 20px;
    margin-top: 30px;
  }

</style>