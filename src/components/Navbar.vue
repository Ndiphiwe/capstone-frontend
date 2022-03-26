<template>

  <div class="topnav" id="myTopnav">
    <router-link :to="{name: 'Home'}"><i class='bx bx-camera-movie' style='color:#ffffff' ></i> Home</router-link> 
    <router-link :to="{name: 'About'}">About</router-link> 
    <router-link :to="{name: 'Blog-posts'}">Blog Posts</router-link> 
    <router-link @click="loginCheck" :to="{name: 'Create-blog'}">Create Blog Post</router-link> 
    <router-link :to="{name: 'SignUp'}">Sign Up</router-link> 
    <router-link :to="{name: 'LogIn'}">Log In</router-link> 
    <router-link @click="logout" :to="{name: 'Home'}">Log Out</router-link> 
    <router-link :to="{name: 'Blog-admin'}">Admin</router-link>
    <router-link :to="{name: 'Contact'}">Contact</router-link>
  <a href="javascript:void(0);" class="icon" @click="myFunction">
    <i class='bx bx-menu bx-lg' style='color:#ffffff'></i>
  </a>
</div>

</template>

<script>
export default {
  methods: {
    myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
},
  logout() {
      localStorage.clear();
      this.toggleNav;
    },
  },
  loginCheck(){
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
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

.topnav {
  padding: 30px;
  background-color: #000000a6;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
}

.topnav a {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  color: whitesmoke;
  padding: 10px;
  border-radius: 4px;
  text-decoration: none;
}

.topnav a:hover {
  color: #ec1f1f;
}

.topnav a.router-link-exact-active {
  color: #ff2626;
  background-color: black;
}

button{
  margin: 0 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}

/* #nav {
  padding: 30px;
  background-color: #00000050;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
}

#nav a {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  color: whitesmoke;
  padding: 10px;
  border-radius: 4px;
  text-decoration: none;
}

#nav a:hover{
  color: #ec1f1f;
}

#nav a.router-link-exact-active {
  color: #ff2626;
  background-color: black;
}
button{
  margin: 0 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;
} */

</style>