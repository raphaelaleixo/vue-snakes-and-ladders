import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game: {},
    defs: {
      transitionTime: 500,
      dice: {
        rotations: 10,
        timing: 250,
      },
      playerColors: ['#f6511d', '#00a6ed', '#7FB800', '#FFB400'],
    },
  },
  getters,
  mutations,
  actions,
});
