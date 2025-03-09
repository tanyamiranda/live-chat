<template>
  <div class="welcome container">
    <p class="container-title">Welcome</p>
    <div v-if="showLogin">
      <LoginForm @login="enterChat"/>
      <p>No account yet? <span @click="showLogin = false">Sign up</span> Instead.</p>
    </div>
    <div v-else>
      <SignupForm @signup="enterChat"/>
      <p>Already Registered? <span @click="showLogin = true">Log in</span> Instead.</p>
    </div>
  </div>
</template>

<script>
import SignupForm from '@/components/SignupForm.vue';
import LoginForm from '@/components/LoginForm.vue';
import {ref} from 'vue';
import {useRouter} from 'vue-router';

export default {
  components: {SignupForm, LoginForm},
  setup() {
    const showLogin = ref(true)
    const router = useRouter()

    const enterChat = () => {
      router.push({name:"chatroom"})
    }

    return {
      showLogin,
      enterChat
    }
  }
}
</script>

<style>
.welcome {
  text-align: center;
  padding: 20px 0;
}

.welcome form {
  width: 300px;
  margin: 20px auto;
}

.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  font-family: monospace;
  width: 90%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #dadada;
  outline: none;
  color: #999;
  margin: 10px auto;
}
.welcome span {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}

.welcome button {
  margin: 20px auto;
}
</style>