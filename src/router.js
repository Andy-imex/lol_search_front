import Vue from 'vue';
import Router from 'vue-router';
import Main from './page/Main'
import Admin from './page/Admin'
import Login from "./page/Login";

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