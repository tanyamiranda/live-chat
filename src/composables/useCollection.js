import {ref} from 'vue'
import {projectFirestoreDB, timestamp, an} from '@/firebase/config'
import {collection, addDoc} from 'firebase/firestore'

const useCollection = () => {

  const error = ref(null)

  const addDocument = async(doc) => {
    error.value = null;

    try {

      doc.createdAt = timestamp
      const collectionRef = collection(projectFirestoreDB, an);
      const docRef = await addDoc(collectionRef, doc)

    }
    catch(err) {
      console.log("err", err.message)
      error.value = "addDocument error:" + err.message
    }

  }

  return {error, addDocument}
}

export default useCollection