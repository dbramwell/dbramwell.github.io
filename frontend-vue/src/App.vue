<template>
  <Suspense>
    <template #default>
      <default></default>
    </template>
    <template #failure>
      <error-404></error-404>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Default from './components/Default.vue'
import Error404 from './components/Error404.vue'
export default defineComponent({
  name: 'PageIndex',
  components: {
    Default,
    Error404,
  },
});
</script>
