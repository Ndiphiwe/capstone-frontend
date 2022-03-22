import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import BlogPosts from '../views/BlogPosts.vue'
import BlogsCart from '../views/BlogCrud.vue'
import PostDetails from '../views/BlogPostDits.vue'
// import BlogCart from '../views/BlogsCrud.vue'
import CreateBlog from '../views/CreateBlog.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import Profile from '../views/Profile.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/blog-posts',
    name: 'Blog-posts',
    component: BlogPosts
  },
  {
    path: '/blog-cart',
    name: 'Blog-cart',
    component: BlogsCart
  },
  {
    path: '/blogs/:id',
    name: 'PostDetails',
    component: PostDetails,
    props: true
  },
  {
    path: '/create-blog',
    name: 'Create-blog',
    component: CreateBlog
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');
//   // trying to access a restricted page + not logged in
//   // redirect to login page


//   if (to.path == '/create-blog' && !loggedIn) next({ name: 'SignUp' })
//   else next()

//   // if (authRequired && !loggedIn) {
//   //   next('/login');
//   // } else {
//   //   next();
//   // }
// });


export default router
