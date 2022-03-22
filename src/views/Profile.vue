<template>
  <div class="about">
      <Navbar />

      <h1>User profile</h1>
      <p>Author name: {{data.message}}</p>
      <p>Email:</p>
      <p>Acces token:</p>
  </div>
</template>tkn

<script>
import Navbar from '../components/Navbar.vue'
export default {
    
    components: {Navbar},
    data() {
    return {
      authors: []
    };
  },
    mounted() {
    if (localStorage.getItem("jwt")) {
      fetch("https://ndiphiwe-captone-project.herokuapp.com/blogs", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.blogPosts = json;
          this.blogPosts.forEach(async (blog) => {
            await fetch(
              "https://ndiphiwe-captone-project.herokuapp.com/users/" + blog.author,
              {
                method: "GET",
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
              }
            )
              .then((response) => response.json())
              .then((json) => {
                  console.log(json)
                blog.author_name = json.name;
              });
          });
        })
        .catch((err) => {
          alert("User not logged in");
        });
    } else {
      alert("User not logged in");
      this.$router.push({ name: "LogIn" });
    }
  },
}
</script>

<style>

</style>