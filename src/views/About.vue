<template>
  <div class="about">
    <Navbar />
    <h1 class="text-light py-5">ABOUT</h1>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: {Navbar}
}
</script>

<style scoped>
  .about h1{
    font: 300 60px 'Oswald', sans-serif;
  }
  .about{
    height:100vh;
  }
</style>
