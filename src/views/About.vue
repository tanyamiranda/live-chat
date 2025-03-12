<template>
  <div class="welcome container">
    <p class="container-title">About This App</p>
    <div class="about-details">
      <p>This live chat app is built with Vue and is used for learning purposes only. There are limitations.</p>
      <p>If you see any issues or just want to talk to the developer, please use the link below.</p>
      <p class="link" @click="contactDeveloper">Contact Developer</p>
      
    </div>  
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const contactDeveloper = () => {  
      window.open('https://tanyamiranda.github.io/', '_blank'); // Replace with your desired URL
    }    

    return {contactDeveloper}
  }
}
</script>

<style>

.about-details {
  padding: 0 20px;
  max-width: 400px;
  margin: auto;
  line-height: 25px;
  text-align: left;
}
.link{
  text-decoration: underline;
  cursor: pointer;
  text-underline-offset: 3px;
  text-align: center;
  padding: 20px 10px;
}

ul {
  padding: 0 10px;
}
</style>