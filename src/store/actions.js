import database from '@/database';
import rules from '@/api/rules'

export default {
  loadGame: async (context, payload) => {
    const loadedGame = await database
      .ref('/')
      .orderByChild('url')
      .equalTo(payload);
    await loadedGame.on('child_added', snapshot => {
      context.commit('SET_GAME', snapshot.val());
    });
    loadedGame.on('child_changed', snapshot => {
      context.commit('SET_GAME', snapshot.val());
    });
  },
  setLocalGame: (context, payload) => {
    context.commit('SET_GAME', {
      ...payload,
      serverUpdate: false
    });
  },
  updateGame: async (context, payload) => {
    if (context.state.game.turn < payload.turn) {
      await database.ref('/' + payload.id).set({
        ...payload,
        serverUpdate: true
      });
    }
  },
  updateDice: async (context, payload) => {
    await database.ref('/' + payload.id).set({
      ...payload,
      serverUpdate: true
    });
  },
  addGame: async (context, payload) => {
    const gameList = database.ref('/');
    const game = await gameList.push();
    const gamekey = game.getKey();
    const gameData = rules.createGame(payload.base, payload.numberOfPlayers, gamekey);
    await game.set(gameData);
    context.commit('SET_GAME', gameData);
    context.dispatch('loadGame', gameData.url);
  },
};
