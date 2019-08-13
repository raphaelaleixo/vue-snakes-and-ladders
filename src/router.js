import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/game/:id',
      name: 'game',
      component: () => import('./views/Game.vue'),
    },
    {
      path: '/game/:id/:player',
      name: 'player',
      component: () => import('./views/Player.vue'),
    },
  ],
});
