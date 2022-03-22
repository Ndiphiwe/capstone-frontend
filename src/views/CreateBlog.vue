<template>
  <div class="about">
    <Navbar />
    <h1 class="display-5 py-5 text-light">CREATE A BLOG POST</h1>
        <div class="login">
            <div class="login-triangle"></div>
            
            <h2 class="login-header">Blog post details</h2>

            <form @submit.prevent="addBlogPost" class="login-container">
                <p><input type="text" v-model="title" placeholder="Title" required></p>
                <p><input type="text" v-model="category" placeholder="Category" required></p>
                <p><input type="text" v-model="img" placeholder="Image URL" required></p>
                <p><input type="text" v-model="description" placeholder="Description" required></p>
                <p><input type="text" v-model="author" placeholder="Author" required></p>
                <p><input type="submit" value="Add Blog Post"></p>
            </form>
            </div>
        </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: {Navbar},
  data() {
    return {
      title: "",
      category: "",
      description: "",
      author: "",
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
  methods: {
    addBlogPost() {
      if (!localStorage.getItem("jwt")) {
        alert("User not logged in");
        return this.$router.push({ name: "Login" });
      }
      fetch("https://ndiphiwe-captone-project.herokuapp.com/blogs", {
        method: "POST",
        body: JSON.stringify({
          title: this.title,
          category: this.category,
          img: this.img,
          description: this.description,
          author: this.author,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          alert("Post Created");
          this.$router.push({ name: "Blog-posts" });
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
}
</script>


<style scoped>
  /**
 * 01/28/2016
 * This pen is years old, and watching at the code after all
 * those years made me fall from my chair, so I:
 * - changed all IDs to classes
 * - converted all units to pixels and em units
 * - changed all global elements to classes or children of
 *   .login
 * - cleaned the syntax to be more consistent
 * - added a lot of spaces that I so hard tried to avoid
 *   a few years ago
 *   (because it's cool to not use them)
 * - and probably something else that I can't remember anymore
 *
 * I sticked to the same philosophy, meaning:
 * - the design is almost the same
 * - only pure HTML and CSS
 * - no frameworks, preprocessors or resets
 */

/* 'Open Sans' font from Google Fonts */
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);


.login {
  width: 400px;
  margin: 16px auto;
  font-size: 16px;
}

  .about h1{
    font: 300 60px 'Oswald', sans-serif;
  }

/* Reset top and bottom margins from certain elements */
.login-header,
.login p {
  margin-top: 0;
  margin-bottom: 0;
}

/* The triangle form is achieved by a CSS hack */
.login-triangle {
  width: 0;
  margin-right: auto;
  margin-left: auto;
  border: 12px solid transparent;
  border-bottom-color: rgb(165, 17, 30);
}

.login-header {
  background: rgb(165, 17, 30);
  padding: 20px;
  font-size: 1.4em;
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
}

.login-container {
  background: #dadada;
  padding: 12px;
}

/* Every row inside .login-container is defined with p tags */
.login p {
  padding: 12px;
}

.login input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  padding: 16px;
  outline: 0;
  font-family: inherit;
  font-size: 0.95em;
}

.login input[type="text"],
.login input[type="email"],
.login input[type="password"] {
  background: #000;
  border-color: #bbb;
  color: #fff;
}

/* Text fields' focus effect */
.login input[type="text"]:focus,
.login input[type="email"]:focus,
.login input[type="password"]:focus {
  border-color: #888;
}

.login input[type="submit"] {
  background: rgb(165, 17, 30);
  border-color: transparent;    
  color: #fff;
  cursor: pointer;
  box-shadow: rgba(54, 54, 54, 0.76) 1px 1px 10px;
}

.login input[type="submit"]:hover {
  background: #000000;
  transition: .3s ease-in-out;
}

/* Buttons' focus effect */
.login input[type="submit"]:focus {
  border-color: #05a;
}
</style>

