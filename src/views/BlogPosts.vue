<template>
  <div class="about">
    <Navbar />
    <h1 class="text-light py-5">BLOG POSTS</h1>
    <div class="container">

          <div v-if="blogPosts.length">
            <label>
              Sort Title:
              <select v-model="title" @change="sortTitle(title)">
                  <option value="">All</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>

            <div class="blog-card" v-for="blogPost in blogPosts" :key="blogPost._id">
              <div class="meta">
                <div class="photo">
                  <img :src="blogPost.img" alt="">
                </div>
                <ul class="details">
                  <li class="author"><a href="#">{{blogPost.author}}</a></li>
                  <li class="date">Aug. 24, 2015</li>
                  <li class="tags">
                    <ul>
                      <li><a href="#">Learn</a></li>
                      <li><a href="#">Code</a></li>
                      <li><a href="#">HTML</a></li>
                      <li><a href="#">CSS</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="description">
                <h1>{{blogPost.title}}</h1>
                <h2>{{blogPost.category}}</h2>
                <p class="para">{{blogPost.description.substring(0, 290)}}...</p>
                <p class="read-more">
                <router-link :to="{name: 'PostDetails', params: {id: blogPost._id}}">
                  Read More
                </router-link>
                </p>
              </div>
          </div>
        </div>
        <div v-else class="loader">
          <p><i class='bx bx-loader bx-sm bx-spin' style="color: #fd1c1c;"></i>  Loading Blog Posts...</p>
        </div>
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
            blogPosts: [],
            filteredBlogs: null,
            title: ""
        }
    },
    mounted() {
        fetch("https://ndiphiwe-captone-project.herokuapp.com/blogs")
        .then(res => res.json())
        .then((data) => {
          this.blogPosts = data;
          this.filteredBlogs = data;
          })
        .catch(err => console.log(err.message))
    },
    methods: {
      sortTitle(dir) {
        this.filteredBlogs = this.filteredBlogs.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        if (dir == "desc") this.filteredBlogs.reverse();
      },
    },
    
}
</script>

<style scoped>
  .about{
    height: 100%;
  }
  .about h1{
    font: 300 60px 'Oswald', sans-serif;
  }
  .container{
    padding-bottom: 10vh;
  }
.loader{
  color: #fff;
}

/*PEN STYLES*/
* {
  box-sizing: border-box;
}

.blog-card {
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  box-shadow: 0 3px 7px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2.6%;
  background: #000;
  line-height: 1.4;
  font-family: sans-serif;
  border-radius: 5px;
  overflow: hidden;
  z-index: 0;
  border: 1px solid grey;
}
.blog-card a {
  color: #fff;
}
.blog-card .para {
  color: antiquewhite;
}

.blog-card a:hover {
  color: #ec1f1f;
}
.blog-card:hover .photo {
  transform: scale(1.3) rotate(3deg);
}
.blog-card .meta {
  position: relative;
  z-index: 0;
  height: 200px;
}
.blog-card .photo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.2s;
}
.blog-card .details,
.blog-card .details ul {
  margin: auto;
  padding: 0;
  list-style: none;
}
.blog-card .details {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -100%;
  margin: auto;
  transition: left 0.2s;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 10px;
  width: 100%;
  font-size: 0.9rem;
}
.blog-card .details a {
  -webkit-text-decoration: dotted underline;
          text-decoration: dotted underline;
}
.blog-card .details ul li {
  display: inline-block;
}
.blog-card .details .author:before {
  font-family: FontAwesome;
  margin-right: 10px;
  content: "";
}
.blog-card .details .date:before {
  font-family: FontAwesome;
  margin-right: 10px;
  content: "";
}
.blog-card .details .tags ul:before {
  font-family: FontAwesome;
  content: "";
  margin-right: 10px;
}
.blog-card .details .tags li {
  margin-right: 2px;
}
.blog-card .details .tags li:first-child {
  margin-left: -4px;
}
.blog-card .description {
  padding: 1rem;
  background: #000;
  position: relative;
  z-index: 1;
}

.blog-card .description h1 {
  line-height: 2;
  margin: 0;
  font-size: 1.7rem;
  font-family: Poppins, sans-serif;
  text-transform: uppercase;
  color: beige;
}
.blog-card .description h2 {
  font-size: 1rem;
  font-weight: 300;
  color: gray;
  margin-top: 5px;
}
.blog-card .description .read-more {
  text-align: right;
}
.blog-card .description .read-more a {
  color: #ec1f1f;
  display: inline-block;
  position: relative;
}
.blog-card .description .read-more a:after {
  content: "";
  font-family: FontAwesome;
  margin-left: -10px;
  opacity: 0;
  vertical-align: middle;
  transition: margin 0.3s, opacity 0.3s;
}
.blog-card .description .read-more a:hover:after {
  margin-left: 5px;
  opacity: 1;
}
.blog-card p {
  position: relative;
  margin: 1rem 0 0;
}
.blog-card p:first-of-type {
  margin-top: 1.25rem;
}
.blog-card p:first-of-type:before {
  content: "";
  position: absolute;
  height: 5px;
  background: #ec1f1f;
  width: 35px;
  top: -0.75rem;
  border-radius: 3px;
}
.blog-card:hover .details {
  left: 0%;
}
@media (min-width: 640px) {
  .blog-card {
    flex-direction: row;
    max-width: 800px;
  }
  .blog-card .meta {
    flex-basis: 40%;
    height: auto;
  }
  .blog-card .description {
    flex-basis: 60%;
  }
  .blog-card .description:before {
    transform: skewX(-3deg);
    content: "";
    background: #000;
    width: 30px;
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
  .blog-card.alt {
    flex-direction: row-reverse;
  }
  .blog-card.alt .description:before {
    left: inherit;
    right: -10px;
    transform: skew(3deg);
  }
  .blog-card.alt .details {
    padding-left: 25px;
  }
}

</style>