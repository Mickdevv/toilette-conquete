import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

App.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBLI1ll82HbVqPrmsxH0-2_ZgxJDl1XrQg'
  },
})