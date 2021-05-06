import Vue from 'vue'
import Router from 'vue-router'
import Livetv from './views/LiveTv.vue'
import MovieStream from './views/MovieStream.vue'
import Movies from './views/Movies.vue'
import Series from './views/Series.vue'
import Catchup from './views/CatchUp.vue'
import Settings from './views/Settings.vue'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
Vue.use(Router)
var router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: "/",
      component:Main,
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem("isLoggedIn")){
          next()
        }else{
          next('/login')
        }
      },
      meta: {
            auth: true
          },
      children: [
        {
          path: "",
          name: "livetv",
          component: Livetv,
        },
        {
          path: "movies",
          name: "movies",
          component: Movies,
        },
        {
          path: "movie/:id",
          name: "movies_stream",
          component: MovieStream,
        },
        {
          path: "series",
          name: "series",
          component: Series
        },
        {
          path: "catchup",
          name: "catchup",
          component: Catchup
        },
        {
          path: "settings",
          name: "settings",
          component: Settings
        }
      ]
    }
  ]
});

export default router