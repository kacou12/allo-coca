import './assets/main.css'
import Toast, { useToast, type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import InfiniteLoading from '@/plugins/infiniteLoadingPlugins'

import App from './App.vue'
import router from './router'




const app = createApp(App)
app.use(Toast, {
  autoClose: 3000,
  // ...   
} as PluginOptions)
const toast = useToast()


const pinia = createPinia()

app.use(pinia)

app.use(router)

// app.component('infinite-loading', InfiniteLoading)

app.mount('#app')
// export { queryClient }
