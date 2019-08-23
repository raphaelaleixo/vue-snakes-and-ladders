export default {
  createGame(base, numberOfPlayers, gamekey) {
    const totalSquares = base * base;
    const createPlayers = numberOfPlayers => {
      const players = [];
      for (let i = 0; i < numberOfPlayers; i++) {
        players.push({
          position: 1,
          number: i + 1,
        });
      }
      return players;
    };
    const createBoard = base => {
      let squares = [];
      let specialSquares = [1, 2, totalSquares];
      for (let i = 1; i <= totalSquares; i++) {
        squares = [
          ...squares,
          {
            number: i,
            type: i === totalSquares ? 'goal' : '',
          },
        ];
      }
      const chooseRandomSquare = (higherOrLower, numberToCompare) => {
        let specialSquare = Math.floor(Math.random() * totalSquares) + 1;
        if (higherOrLower === 'lower') {
          let lowerSquares = Array(numberToCompare - 1)
            .fill()
            .map((v, i) => i + 1);
          if (lowerSquares.every(item => specialSquares.includes(item))) {
            return false;
          }
        }
        if (higherOrLower === 'higher') {
          let higherSquares = Array(totalSquares - numberToCompare)
            .fill()
            .map((v, i) => i + 1 + numberToCompare);
          if (higherSquares.every(item => specialSquares.includes(item))) {
            return false;
          }
        }
        if (specialSquares.includes(specialSquare)) {
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
          specialSquares = [firstNumber, secondNumber, ...specialSquares];
          squares = squares.map(item => (item.number === firstNumber ? { ...item, from: firstNumber, to: secondNumber, type: higherOrLower } : item));
        }
      };
      for (let i = 0; i < Math.floor(base / 2); i++) {
        createSpecialSquare('higher');
        createSpecialSquare('lower');
      }
      return {
        squares,
        specialSquares,
      };
    };
    return {
      numberOfPlayers,
      base,
      totalSquares,
      gamekey,
      players: createPlayers(numberOfPlayers),
      gameId: Math.random()
        .toString(36)
        .substring(2, 7),
      winner: false,
      turn: 0,
      board: createBoard(base),
      dice: {
        locked: false,
        dice1: 1,
        dice2: 1,
      },
    };
  },

  playTurn(gameData, player, localCallback, serverCallback) {
    let game = gameData.state;
    const defs = gameData.defs;
    game.walked = game.dice.dice1 + game.dice.dice2;
    const nextTurn = () => {
      game.dice.locked = false;
      game.turn++;
      serverCallback(game);
    };
    const checkPosition = async player => {
      let specialPositions = game.board.squares.map(item => item.from);
      if (specialPositions.includes(game.players[player].position)) {
        let rule = game.board.squares.filter(item => item.from === game.players[player].position);
        game.players[player].position = rule[0].to;
      }
      if (game.players[player].position === game.totalSquares) {
        game.dice.locked = false;
        game.winner = (game.turn % game.numberOfPlayers) + 1;
        game.turn++;
        await serverCallback(game);
        return false;
      }
      nextTurn();
    };
    const walkForward = player => {
      const walk = () => {
        if (game.walked > 0) {
          game.players[player].position++;
          if (game.players[player].position > game.totalSquares) {
            game.players[player].position--;
            bounceBack(player);
          } else {
            game.walked--;
            localCallback(game);
            setTimeout(walk, defs.transitionTime);
          }
        } else {
          checkPosition(player);
        }
      };
      walk();
    };
    const bounceBack = player => {
      const bounce = () => {
        if (game.walked > 0) {
          game.players[player].position--;
          game.walked--;
          localCallback(game);
          setTimeout(bounce, defs.transitionTime);
        } else {
          checkPosition(player);
        }
      };
      bounce();
    };
    walkForward(player);
  },
};
