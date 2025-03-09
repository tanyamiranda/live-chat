<template>
  <nav v-if="user">
    <div>
      <p>Hey there {{ user.displayName }}</p>
      <p class="email">Currently logged in as {{ user.email }}</p>
    </div>
    <button @click="handleLogout">log out</button>
  </nav>
</template>

<script>
import useLogout from '@/composables/useLogout';
import getUser from '@/composables/getUser';
import { useRouter } from 'vue-router';

export default {
  setup(props, context) {
    const {error, logout} = useLogout()
    const {user} = getUser()
    const router = useRouter()
    
    const handleLogout = async() =>{ 
      await logout()
      if (!error.value) {
        router.push({name:"welcome"})
      }
    }

    return {
      user,
      error,
      handleLogout
    }
  }
}
</script>

<style>
nav {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: left;
  text-align: left;
}
nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #444;
}
nav p.email {
  font-size: 14px;
  color: #999;
}
</style>