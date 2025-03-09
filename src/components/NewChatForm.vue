<template>
  <form>
    <textarea
      placeholder="Type a message and hit enter to send..."
      v-model="message"
      @keypress.enter.prevent="handleSubmit">
    </textarea>
    <div class="error">{{ error }}</div>
    <!--<button class="mobile-button">send message</button>-->
  </form>
</template>

<script>
import getUser from '@/composables/getUser'
import {ref} from 'vue'
import {timestamp} from '@/firebase/config'
import useCollection from '@/composables/useCollection'

export default {
  setup() {

    const {user} = getUser()
    const {error, addDocument} = useCollection()
    const collectionName = "live-chat"
    const message = ref("")

    const handleSubmit = async() => {
      const chat = {
        name: user.value.displayName,
        email: user.value.email,
        message: message.value,
        createdAt: timestamp
      }

      await addDocument(collectionName,chat)

      if (!error.value)
        message.value = ""

    }

    return {
      user, 
      message,
      handleSubmit,
      error
    }
  }
}
</script>

<style scoped>
form {
    margin: 10px;
  }
  textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
    resize: none;
  }
  
  .mobile-button {
    display:none;
    width: 75%;
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 600px) {
    .mobile-button {
      display:inline-block;
    }
  }
</style>