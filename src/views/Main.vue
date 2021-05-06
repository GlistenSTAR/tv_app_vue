<template>
  <div class="flex flex-row flex-wrap" id="app">
    <AppBar />
    <router-view/>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue'

export default {
  name: 'main',
  components: {
      AppBar
  }
}
</script>
