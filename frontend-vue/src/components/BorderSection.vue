<template>
  <div class="bordered-container">
    <h6 class="header is-size-3 is-size-4-mobile has-background-white-bis" v-if="header">{{header}}</h6>
    <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue';

export default defineComponent({
  name: 'MyRepos',
  props: {
    header: {
      type: String,
    }
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>

  .bordered-container {
    border: 4px;
    border-color: black;
    border-style: solid;
    margin-top: 50px;
  }

  .header {
    margin-top: -15px;
    margin-left: 10px;
    display: table;
    padding: 0 10px;
    margin-bottom: 30px;
    position: absolute;
  }

</style>