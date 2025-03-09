import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

import { projectAuth } from './firebase/config'

//Add state change check so that firebase can check authentication
let app = null;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .mount('#app')
  }
})


// Original Code
//createApp(App).use(router).mount('#app')
