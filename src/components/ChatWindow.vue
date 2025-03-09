<template>
  <div class="chat-window">
    <div class="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messagesTextArea">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createdAt}}</span>
        <span class="name">{{ doc.name }}:</span>
        <span class="message">{{ doc.message }}</span>
      </div>
    </div>

  </div>
</template>

<script>
import getCollection from '@/composables/getCollection';
import { formatDistanceToNow } from 'date-fns';
import { computed, ref, onUpdated } from 'vue';

export default {
  setup() {

    const {documents, error, getCollectionDocuments} = getCollection()
    const collectionName = "live-chat"

    getCollectionDocuments(collectionName, "createdAt", "asc")

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map(doc => {
          if (doc.createdAt) {
            let time = formatDistanceToNow(doc.createdAt.toDate())
            return {...doc, createdAt: time}
          }
          else
            return {...doc, createdAt: ""}
        })
      }
    })

    //auto scroll to bottom of chat window whenever data is updated
    const messagesTextArea = ref(null)
    onUpdated(() => {
      if(messagesTextArea.value) {
        messagesTextArea.value.scrollTop = messagesTextArea.value.scrollHeight
      }
    })

    return {
      error,
      documents,
      messagesTextArea,
      formattedDocuments
    }
  }
}
</script>

<style scoped>
  .chat-window {
    text-align: left;
    background: #fafafa;
    padding: 20px;
  }
  .single {
    margin: 18px 0;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    height: 300px;
    overflow: auto;
  }
</style>