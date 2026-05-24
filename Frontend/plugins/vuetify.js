import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'custom',
    themes: {
      custom: {
        dark: false,
        colors: {
          background: '#FFF5F0',
          surface: '#FFFFFF',
          primary: '#FFB5A7',
          secondary: '#2C2C2C',
          accent: '#FFD4C5',
          text: '#2C2C2C',
          textSecondary: '#8E8E8E',
        },
      },
    },
  },
});
