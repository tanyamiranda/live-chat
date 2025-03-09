import {ref} from 'vue'
import {projectAuth} from '@/firebase/config';
import {signInWithEmailAndPassword} from 'firebase/auth';

const error = ref(null)

const login = async(email, password) => {

  error.value = null;

  try{

    let user = null;

    await signInWithEmailAndPassword(projectAuth, email, password)
    .then((userCredential) => {
        // Success
        user = userCredential.user;
        error.value = null;
    })
    return user;
      
  }
  catch (err) {
    console.log("Login error",err.message)
    error.value = "Incorrect Login Credentials"
  }
}

const useLogin = () => {
    return {error, login}
}

export default useLogin