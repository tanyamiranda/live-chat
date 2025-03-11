import {ref} from 'vue'
import {projectAuth, projectFirestoreDB, an, ac} from '@/firebase/config';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {collection, getDocs, query, where} from "firebase/firestore";

const error = ref(null)

const signup = async(email, password, displayName, code) => {
    
  error.value = null;

  try{

    const isValidRequest = await validateRequest(code)

    if (isValidRequest) {

      const userCredential = await createUserWithEmailAndPassword(projectAuth, email, password)
      
      const user = userCredential.user

      await updateProfile(user, { displayName })

      error.value = null

      return user;
    }
    else {
      error.value = "Invalid Access Code."
    }
      
  }
  catch (err) {
    switch (err.code) {
      case 'auth/invalid-email':
        error.value = 'The email address is not valid.'
        break;
      case 'auth/email-already-in-use':
        error.value = 'The email address is already in use.'
        break;
      case 'auth/weak-password':
        error.value = 'The password is too weak.'
        break;
      case 'auth/operation-not-allowed':
        error.value = 'Account is disabled.'
        break;
      case 'auth/too-many-requests':
        error.value = 'Too many requests. Please try again later.'
        break;
      default:
        error.value = 'Error registering user. Error Code: ' + err
        break;
    }

  }
}

const validateRequest = async (code) => {

  try {

    let returnValue = false

    const accessCodesRef = collection(projectFirestoreDB, ac);
    const q = query(
      accessCodesRef,
      where("app-name", "==", an), // match app-name field
      where("code", "==", code)         // match code field
    );

    const querySnapshot = await getDocs(q);

    returnValue = !querySnapshot.empty
    
    return returnValue;  
  
  } catch (error) {
    throw Error("validateRequest error:", error)
  }
}

const useSignup = () => {
    return {error, signup}
}

export default useSignup