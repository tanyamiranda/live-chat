<template>
  <form @submit.prevent="handleSubmit" >
    <input type="text" required placeholder="display name" v-model="displayName" />
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <input type="text" required placeholder="access code" v-model="accessCode" />
    <div class="error">{{ error }}</div>
    <button>sign up</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import useSignup from '@/composables/useSignup';
export default {

  setup(props, context) {

    const {error, signup} = useSignup();

    const displayName = ref('')
    const email = ref('')
    const password = ref('')
    const accessCode = ref(null)

    const handleSubmit = async() => {
      await signup(email.value, password.value, displayName.value, accessCode.value)

      if (!error.value){
        context.emit('signup') // defined in the properties of the html element using this component 
      }
    }

    return {
      displayName, 
      email,
      password,
      accessCode,
      handleSubmit,
      error
    }
  }

}
</script>

<style>

</style>