import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { mdiViewDashboard, mdiBookshelf, mdiTypewriter } from "@mdi/js";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
    //
  },
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      dashboard: mdiViewDashboard,
      books: mdiBookshelf,
      authors: mdiTypewriter,
    },
    sets: {
      mdi,
    },
  },
});

app.use(router);
app.use(vuetify);

app.mount("#app");
