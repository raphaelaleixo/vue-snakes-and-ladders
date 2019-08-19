export default {
  actualPlayer: state => {
    return (state.game.turn % state.game.numberOfPlayers) + 1;
  },
  playerRanking: state => {
    if (state.game.players) {
      let players = [...state.game.players];
      return players.sort((a, b) => {
        if (a.position > b.position) {
          return -1;
        }
        if (a.position < b.position) {
          return 1;
        }
        return 0;
      });
    } else {
      return false;
    }
  },
};
