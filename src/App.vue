<template>
  <!--<nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
-->
  <div class="chat-room-title">Live Chat Room</div>
  <router-view/>
  <div class="footer">
    <p v-if="!hideAbout" class="about-link" @click="aboutLink">about this app</p>
  </div>
</template>

<script>
import {useRouter, useRoute} from 'vue-router';
import {computed} from 'vue';

export default {
  setup() {

    const route = useRoute()
    const hideAbout = computed(() => route.path === '/about');

    const router = useRouter()

    const aboutLink = () => {
      router.push({name:"about"})
    }    

    return {aboutLink, hideAbout}
  },
}
</script>


<style>
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.chat-room-title {
  color:white;
  font-family: monospace;
  font-size: 20pt;
  padding-top: 10px;
}

.footer {
  color:white;
}

.about-link{
  text-decoration: underline;
  cursor: pointer;
  text-underline-offset: 3px;
}
</style>
