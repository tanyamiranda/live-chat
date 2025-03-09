import { ref, watchEffect } from "vue";
import { projectFirestoreDB } from '../firebase/config'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const getCollection = () => {

  const documents = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const getCollectionDocuments = async (collectionName, fieldName, order = "asc") => {
    loading.value = true;
    error.value = null;

    try {

      let collectionRef = collection(projectFirestoreDB, collectionName);
      let q = fieldName ? query(collectionRef, orderBy(fieldName, order)) : collectionRef;

      // Listen for real-time updates
      const unsubscribe = onSnapshot(q, (snapshot) => {
        documents.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        loading.value = false;
      }, (err) => {
        error.value = err.message;
        loading.value = false;
      });

      // ****************************
      // Unsubscribe real time listeners when component unmounts
      //
      // There are two parts working here. watchEffect is looking for when any 
      // component using the firebase snapshot unmounts, and then calls the internal
      // onInvalidate function inside watchEffect()
      //
      // In setting up the unsubscribe const variable above, the onSnapshot() method
      // returns a function that can then be invoked to actually unsubscribe from
      // the real-time listener, which is why we name the variable as such
      watchEffect((onInvalidate) => {
        onInvalidate(() => unsubscribe())
      })

    } catch (err) {
      console.error("getCollectionDocuments error:", err);
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };


  return { documents, loading, error, getCollectionDocuments };
}

export default getCollection