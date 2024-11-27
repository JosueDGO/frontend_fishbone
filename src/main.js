import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // Aquí ya estás importando el router
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(router)   // Usamos el router que ya importaste
  .use(store)
  .use(vuetify)
  .mount('#app')
