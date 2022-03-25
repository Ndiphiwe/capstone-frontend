<template>
  <div class="adminBox">
	  <h1 class="headingA">Admin Board</h1>
	  <hr>
     <div class="container">
		 <h3 class="headingA">Blog Posts</h3>
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

				<button @click="myFunction(postCart._id)" class="btn btn-secondary">Details</button><br><br>

				<div :id="postCart._id" style="display: none;">
					<div>
						<input type="text" name="" id="" v-model="postCart.title" placeholder="title">
						<input type="text" name="" id="" v-model="postCart.category" placeholder="category">
						<input type="text" name="" id="" v-model="postCart.img" placeholder="Image URL">
						<input type="text" name="" id="" v-model="postCart.description" placeholder="description">
						<input type="text" name="" id="" v-model="postCart.author" placeholder="author">
					</div><br>
					<button @click="editPost(postCart._id)" class="btn btn-warning">Edit</button>
				</div>
				</div>
			</div>
			</div>
  		</div>
		  <hr>
		  <div class="container">
			  <h3 class="headingA">Users</h3>
			  <div class="row row-cols-1 row-cols-md-3 g-4">
				<div class="card pt-3"  v-for='user of users' :key="user._id">
				<div class="card-footer">
				<p class="card-title">Name: {{user.name}}</p>
				<p>Email: {{user.email}}</p>
				<p>Password: {{user.password}}</p>
				</div>
				<div class="card-body">
				<button @click="deleteUser(user._id)" class="btn btn-danger me-3">Delete</button>

				<button @click="myFunction(user._id)" class="btn btn-secondary">Details</button><br><br>

				<div :id="user._id" style="display: none;">
					<div>
						<input type="text" name="" id="" v-model="user.name" placeholder="name">
						<input type="email" name="" id="" v-model="user.email" placeholder="email">
						<input type="password" name="" id="" v-model="user.password" placeholder="password">
					</div><br>
					<button @click="editUser(user._id)" class="btn btn-warning">Edit</button>
				</div>
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
            postsCart: [],
			title: null,
			category: null,
			img: null,
			description: null,
			author: null,
			users: [],
			name: null,
			email: null,
			password: null
        }
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
          this.postsCart = json;
        })
		fetch("https://ndiphiwe-captone-project.herokuapp.com/users", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.users = json;
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

// ################  POSTS #####################

		// Delete post
		deletePost(_id){
		if (!localStorage.getItem("jwt")) {
        alert("User not logged in");
        return this.$router.push({ name: "Login" });
      }
      fetch("https://ndiphiwe-captone-project.herokuapp.com/blogs/" + _id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
		  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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


		// Toggle Post Details
		myFunction(_id) {
			var x = document.getElementById(_id);
			if (x.style.display === "none") {
				x.style.display = "block";
			} else {
				x.style.display = "none";
			}
			},


		// EDIT POST
		editPost(_id){
			if (!localStorage.getItem("jwt")) {
			alert("User not logged in");
			return this.$router.push({ name: "Login" });
		}

		let post = this.postsCart.find(post => post._id === _id)
		fetch("https://ndiphiwe-captone-project.herokuapp.com/blogs/" + _id, {
			method: "PUT",
			body: JSON.stringify(post),
			headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		})
			.then((response) => response.json())
			.then((json) => {
			alert("Post Edited");
			location.reload()
			})
			.catch((err) => {
			alert(err);
			});
		},




// ################  USERS #####################

		// DELETE USER
		deleteUser(_id){
		if (!localStorage.getItem("jwt")) {
        alert("User not logged in");
        return this.$router.push({ name: "Login" });
      }
      fetch("https://ndiphiwe-captone-project.herokuapp.com/users/" + _id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
		  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          alert("User Deleted");
          location.reload()
        })
        .catch((err) => {
          alert(err);
        });
		},

		// TOGGLE USER DETAILS
		myFunction(_id) {
			var x = document.getElementById(_id);
			if (x.style.display === "none") {
				x.style.display = "block";
			} else {
				x.style.display = "none";
			}
			},


		// EDIT USER
		editUser(_id){
			if (!localStorage.getItem("jwt")) {
			alert("User not logged in");
			return this.$router.push({ name: "Login" });
		}

		let user = this.users.find(user => user._id === _id)
		fetch("https://ndiphiwe-captone-project.herokuapp.com/users/" + _id, {
			method: "PATCH",
			body: JSON.stringify(user),
			headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		})
			.then((response) => response.json())
			.then((json) => {
			alert("User Edited");
			location.reload()
			})
			.catch((err) => {
			alert(err);
			});
		},

	},
}
</script>

<style scoped>
.container p, h2, h3{
	color: #000;
}
.adminBox{
	margin-top: 5vh;
	margin-bottom: 5vh;
}
.headingA{
	margin-top: 1rem;
	margin-bottom: 2rem;
}

</style>