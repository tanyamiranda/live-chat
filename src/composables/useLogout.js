import {ref} from 'vue'
import {projectAuth} from '@/firebase/config';
import {signOut} from 'firebase/auth';

const error = ref(null)

const logout = async() => {

  error.value = null;

  try{
    await signOut(projectAuth)   
  }
  catch (err) {
    console.log("Logout error",err.message)
    error.value = err.message
  }
}

const useLogout = () => {
  return {error, logout}
}

export default useLogout