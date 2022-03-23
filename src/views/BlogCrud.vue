<template>
  <div class="shape">
     <div class="container">
		 <div class="row row-cols-1 row-cols-md-3 g-4">
				<div class="card pt-3"  v-for='postCart of postsCart' :key="postCart._id">
				<div class="card-footer">
				<h2 class="card-title">{{postCart.title}}</h2>
				<h3>{{postCart.category}}</h3>
				<!-- <input type="text" :value="postCart.category"> -->
				</div>
				<img :src="postCart.img" class="card-img-top" alt="product.image">
				<div class="card-body">
				<p class="card-text">{{postCart.description}}</p>
				<button @click="deletePost(postCart._id)" class="btn btn-danger me-3">Delete</button>
				<button @clikck="editPost(postCart._id)" class="btn btn-warning">Edit</button>
				</div>
			</div>
			</div>
  		</div>
	</div>
</template>

<script>
export default {
	data() {
        return {
            postsCart: []
        }
    },
    mounted() {
        fetch("https://ndiphiwe-captone-project.herokuapp.com/blogs")
        .then(res => res.json())
        .then((data) => {
			this.postsCart = data;
			console.log()
		})
        .catch(err => console.log(err.message))
    },
	methods: {
		deletePost(_id){
		if (!localStorage.getItem("jwt")) {
        alert("User not logged in");
        return this.$router.push({ name: "Login" });
      }
      fetch("https://ndiphiwe-captone-project.herokuapp.com/blogs/" + _id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          alert("Post Deleted");
          location.reload()
        })
        .catch((err) => {
          alert(err);
        });
		},


		// EDIT POST
		editPost(_id){
			if (!localStorage.getItem("jwt")) {
			alert("User not logged in");
			return this.$router.push({ name: "Login" });
		}
		fetch("https://ndiphiwe-captone-project.herokuapp.com/blogs" + _id, {
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
			alert("Post Edited");
			this.$router.push({ name: "Blog-posts" });
			})
			.catch((err) => {
			alert(err);
			});
		}
	},
}
</script>

<style scoped>
.container p, h2, h3{
	color: #000;
}

</style>