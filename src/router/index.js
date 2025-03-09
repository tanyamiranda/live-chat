import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Chatroom from '@/views/Chatroom.vue'
import About from '@/views/About.vue'
import { projectAuth } from '@/firebase/config'

//user login route guard
const requireAuthentication = (to, from, next) => {
  const user = projectAuth.currentUser
  if(!user) 
    next({name: "welcome"})
  else 
    next()
}

const requireNoAuthentication = (to, from, next) => {
  const user = projectAuth.currentUser
  if(user) 
    next({name: "chatroom"})
  else 
    next()
}

const routes = [
  {
    path: "/",
    name: "welcome",
    component: Welcome,
    beforeEnter: requireNoAuthentication
  },
  {
    path: "/about",
    name: "about",
    component : About
  },
  {
    path: "/chatroom",
    name: "chatroom",
    component : Chatroom,
    beforeEnter: requireAuthentication
  },
  // Catch-all route: Redirect unknown paths to home
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
