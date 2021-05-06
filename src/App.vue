<template>
  
  <router-view/>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<script>
// @ is an alias to /src
import AppBar from '@/components/AppBar.vue'
export default {
  name: 'App',
  components: {
    AppBar
  },
  mounted(){
  
  }
}
</script>