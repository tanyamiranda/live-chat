import {ref} from 'vue'
import {projectAuth} from '@/firebase/config';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

const error = ref(null)

const signup = async(email, password, displayName) => {
    
  error.value = null;

  try{

    const userCredential = await createUserWithEmailAndPassword(projectAuth, email, password)
    
    const user = userCredential.user

    await updateProfile(user, { displayName })

    error.value = null

    return user;
      
  }
  catch (err) {
    console.log("Signup error",err.message)
    error.value = "Signup Failed. " +err.message 
  }
}

const useSignup = () => {
    return {error, signup}
}

export default useSignup