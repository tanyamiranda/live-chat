import {ref} from 'vue'
import {projectFirestoreDB, COLLECTION_NAME} from '@/firebase/config'
import {collection, addDoc} from 'firebase/firestore'

const useCollection = () => {

  const error = ref(null)

  const addDocument = async(collectionName, doc) => {
    error.value = null;

    try {

      const collectionRef = collection(projectFirestoreDB, collectionName);
      const docRef = await addDoc(collectionRef, doc)

      //await projectFirestore.collection(collectionName).add(doc)
    }
    catch(err) {
      console.log("err", err.message)
      error.value = "addDocument error:" + err.message
    }

  }

  return {error, addDocument}
}

export default useCollection