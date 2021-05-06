import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/main.css'
Vue.config.productionTip = false
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css"; // only if your build system can import css, otherwise import it wherever you would import your css.

Vue.use(VuePlyr);
import VueVideoPlayer from "vue-video-player";

// require videojs style
import "video.js/dist/video-js.css";
// import 'vue-video-player/src/custom-theme.css'

Vue.use(
  VueVideoPlayer /* {
  options: global default options,
  events: global videojs events
} */
);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
