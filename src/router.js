import Vue from 'vue';
import Router from 'vue-router';
import Main from './pages/Main'
import Admin from './pages/Admin'
import Login from "./pages/Login";

Vue.use(Router);


export default new Router({
  routes: [
    {
      path: "/",
      component: Main
    },
    {
      path: "/admin",
      component: Admin
    },
    {
      path: "/login",
      component: Login
    }
  ]
})