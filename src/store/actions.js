import database from '@/database';

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
  updateGame: async (context, payload) => {
    if (context.state.game.turn < payload.turn) {
      await database.ref('/' + payload.id).set(payload);
    }
  },
  updateDice: async (context, payload) => {
    await database.ref('/' + payload.id).set(payload);
  },
  addGame: async (context, payload) => {
    const gameList = database.ref('/');
    const game = await gameList.push();
    const gamekey = game.getKey();

    const createPlayers = () => {
      const players = [];
      const numberOfPlayers = payload.numberOfPlayers;
      for (let i = 0; i < numberOfPlayers; i++) {
        players.push({
          position: 1,
        });
      }
      return players;
    };

    const gameData = {
      ...payload,
      players: createPlayers(),
      id: gamekey,
      url: Math.random()
        .toString(36)
        .substring(2, 7),
      winner: false,
      turn: 0,
      board: {
        squares: [],
        specialSquares: [1],
      },
      dice: {
        locked: false,
        dice1: 1,
        dice2: 1,
      },
    };

    const totalSquares = gameData.base * gameData.base;

    const chooseRandomSquare = (higherOrLower, numberToCompare) => {
      let specialSquare = Math.floor(Math.random() * totalSquares) + 1;
      if (higherOrLower === 'lower') {
        let lowerSquares = Array(numberToCompare - 1)
          .fill()
          .map((v, i) => i + 1);
        if (lowerSquares.every(item => gameData.board.specialSquares.includes(item))) {
          return false;
        }
      }
      if (higherOrLower === 'higher') {
        let higherSquares = Array(totalSquares - numberToCompare)
          .fill()
          .map((v, i) => i + 1 + numberToCompare);
        if (higherSquares.every(item => gameData.board.specialSquares.includes(item))) {
          return false;
        }
      }
      if (gameData.board.specialSquares.includes(specialSquare)) {
        return chooseRandomSquare(higherOrLower, numberToCompare);
      }
      if ((higherOrLower === 'higher' && specialSquare > numberToCompare) || (higherOrLower === 'lower' && specialSquare < numberToCompare) || !higherOrLower) {
        return specialSquare;
      } else {
        return chooseRandomSquare(higherOrLower, numberToCompare);
      }
    };

    const createSpecialSquare = higherOrLower => {
      let firstNumber = chooseRandomSquare();
      let secondNumber = chooseRandomSquare(higherOrLower, firstNumber);
      if (!secondNumber) {
        createSpecialSquare(higherOrLower);
      } else {
        gameData.board.specialSquares = [firstNumber, secondNumber, ...gameData.board.specialSquares];
        gameData.board.squares = gameData.board.squares.map(item => (item.number === firstNumber ? { ...item, from: firstNumber, to: secondNumber, type: higherOrLower } : item));
      }
    };

    const createGameBoard = () => {
      for (let i = 1; i < totalSquares + 1; i++) {
        gameData.board.squares = [
          ...gameData.board.squares,
          {
            number: i,
            type: '',
          },
        ];
      }
      gameData.board.squares[totalSquares - 1].type = 'goal';
      gameData.board.specialSquares = [...gameData.board.specialSquares, totalSquares];
      for (let i = 0; i < Math.floor(gameData.base / 2); i++) {
        createSpecialSquare('higher');
        createSpecialSquare('lower');
      }
    };

    createGameBoard();
    const result = await game.set(gameData);
    context.commit('SET_GAME', gameData);
    context.dispatch('loadGame', gameData.url);
    return result;
  },
};
