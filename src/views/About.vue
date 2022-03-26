<template>
  <div class="about">
    <Navbar />
    <h1 class="text-light py-5">ABOUT</h1>
    <div class="container">
    <p>A good documentary or an intelligent historical drama can educate you on important issues and events. Also, watching movies can change our perspective on the people and issues we face every day. We can learn new languages, about other cultures, about historical events, and much more just by watching movies.
</p><br>
<p>A film – also called a movie, motion picture, moving picture, or photoplay – is a work of visual art that simulates experiences and otherwise communicates ideas, stories, perceptions, feelings, beauty, or atmosphere through the use of moving images. These images are generally accompanied by sound and, more rarely, other sensory stimulations. The word "cinema", short for cinematography, is often used to refer to filmmaking and the film industry, and to the art form that is the result of it.</p>
<img src="https://i.postimg.cc/rsBcgw1T/10-Hollywood-Movies-That-Led-To-The-Cancellation-Of-Other-Movies.jpg" alt="">
</div>
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
    height:150vh;
  }
  .container p{
    color: #fff
  }
</style>
