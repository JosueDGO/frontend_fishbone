// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

export default createVuetify({
  icons: {
    defaultSet: 'mdi', // Usa el conjunto de iconos mdi (Material Design Icons)
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2', // Azul como color primario
          secondary: '#424242', // Gris como color secundario
          // Puedes agregar más colores si los necesitas
        },
      },
    },
  },
  display: {
    mobileBreakpoint: 'md', // Define el breakpoint para dispositivos móviles
  },
});
