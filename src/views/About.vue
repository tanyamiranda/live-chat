<template>
  <div class="welcome container">
    <p class="container-title">About This App</p>
    <div class="about-details">
      <p>This live chat app is built with Vue and is used for learning purposes only. There are limitations.</p>
      <div>
        <ul>
          <li>There is only one chat room.</li>
          <li>Chat entries older than three days are deleted.</li>
          <li>There is a 10,000 chat entry limit.</li>
          <li>Emails are NOT validated.</li>
        </ul>
      </div>
      <p>If you see any issues or just want to talk to the developer, please use the link below.</p>
      <center>
        <p class="link" @click="contactDeveloper">Contact Developer</p>
        <p class="link" @click="backToLiveChat">Back to Live Chat</p>
      </center>

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

    const backToLiveChat = () => {
      router.push({name:"welcome"})
    }

    return {backToLiveChat, contactDeveloper}
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
}

ul {
  padding: 0 10px;
}
</style>