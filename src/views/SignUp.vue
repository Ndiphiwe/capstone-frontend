<template>
  <div class="about">
    <Navbar />
    <h1 class="display-5 py-5 text-light">Sign up and create your own blog post.</h1>
        <div class="login">
            <div class="login-triangle"></div>
            
            <h2 class="login-header">Sign Up</h2>

            <form @submit.prevent="register" class="login-container">
                <p><input type="text" v-model="name" placeholder="Name" required></p>
                <p><input type="email" v-model="email" placeholder="Email" required></p>
                <p><input type="password" v-model="password" placeholder="Password" required></p>
                <p><input type="submit" value="Sign Up"></p>
                <p class="query">Already registered? <router-link to="/login">Log In</router-link></p>
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
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      if (!localStorage.getItem("jwt")) {
        alert("User not logged in");
        return this.$router.push({ name: "Login" });
      }
      fetch("https://ndiphiwe-captone-project.herokuapp.com//users/signup", {
        method: "POST",
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          alert("User registered");
          localStorage.setItem("jwt", json.jwt);
          this.$router.push({ name: "SignUp" });
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
  .about{
    height:100vh;
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
.query{
  color: #000;
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

