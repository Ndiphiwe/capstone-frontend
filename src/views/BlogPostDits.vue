<template>

<div class="about">
  <div class="container">
    <div class="dits">
        <button class="btn btn-outline-light me-4" @click="redirect">Home</button>
        <button class="btn btn-outline-light" @click="back">Go Back</button>
        <div class="ditsBox">
            <div v-if="blogPost" class="prjctBox">
            <h1>{{blogPost.title}}</h1>
            <h3>{{blogPost.category}}</h3>
            <!-- <p>The project id is {{id}}</p> -->
            <img :src="blogPost.img" alt="" class="resImg"><br><br>
            <p>{{blogPost.description}}</p>
            </div>
            <div v-else>
                <p><i class='bx bx-loader bx-sm bx-spin'></i> Loading project details...</p>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['id'],
    comments: {},
    data() {
        return {
            blogPost: null
        }
    },
    mounted(){
    //   fetch("http://https://ndiphiwe-captone-project.herokuapp.com/blogs/"+this.id)
    //     .then(res => res.json())
    //     .then(data => this.blogPost = data)
    //     .catch(err => console.log(err.message))
    fetch("https://ndiphiwe-captone-project.herokuapp.com/blogs/" + this.id, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then(async (json) => {
        this.blogPost = json;
        await fetch(
          "https://ndiphiwe-captone-project.herokuapp.com/users/" + json.author,
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
            this.blogPost.author_name = json.name;
          });
      });
    },
    methods: {
        redirect(){
      this.$router.push({name: 'Home'})
    },
        back(){
        this.$router.go(-1)
        },
    },
}
</script>

<style>
*{
    color: #fff;
}
  .about{
    height: 100%;
  }
    .container{
    padding-bottom: 10vh;
  }
.dits{
    padding-top: 4vh;
}
.ditsBox{
    padding-top: 4vh;
}
</style>