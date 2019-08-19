import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import database from '@/database';

Vue.use(Router);

const router = new Router({
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

router.beforeEach(async (to, from, next) => {
  if (to.params.id) {
    const loadedGame = database
      .ref('/')
      .orderByChild('gameId')
      .equalTo(to.params.id);
    await loadedGame.once('value', async snapshot => {
      if (snapshot.exists()) {
        const obj = snapshot.val();
        const gameData = obj[Object.keys(obj)[0]]
        if (to.params.player && to.params.player > gameData.players.length) {
          next({path:'/',query:{error:'player'}});
        } else {
          next();
        }
      }
      else {
        next({path:'/',query:{error:'game'}});
      }
    })
  }
  next();
})

export default router;