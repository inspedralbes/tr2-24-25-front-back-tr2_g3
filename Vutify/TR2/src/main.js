import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from './router';
import pinia from './stores'; // Importa la instancia de Pinia

// Configuración de Vuetify con tema oscuro
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark', // Establece el tema oscuro por defecto
    themes: {
      dark: {
        colors: {
          background: '#000000', // Fondo negro
          surface: '#121212',   // Color de las superficies
          primary: '#BB86FC',   // Color primario
          secondary: '#03DAC6', // Color secundario
          error: '#CF6679',     // Color para errores
        },
      },
    },
  },
});

const app = createApp(App);
app.use(pinia); // Usa Pinia antes de otros plugins
app.use(vuetify);
app.use(router);
app.mount('#app');
