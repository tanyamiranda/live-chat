<template>
  <form @submit.prevent="handleSubmit" >
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button>log in</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import useLogin from '@/composables/useLogin';
export default {

  setup(props, context) {
    const email = ref('')
    const password = ref('')
    const {error, login} = useLogin()

    const handleSubmit = async() => {
      await login(email.value, password.value)

      if (!error.value){
        context.emit('login') // defined in the properties of the html element using this component 
      }
    }

    return { 
      email,
      password,
      handleSubmit,
      error
    }
  }

}
</script>

<style>

</style>