// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import colors from "vuetify/lib/util/colors";

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    theme: {
      dark: true,
      themes: {
        light: {
          primary: colors.purple,
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
        dark: {
          primary: colors.lightBlue,
        },
      },
    },
  }
);
