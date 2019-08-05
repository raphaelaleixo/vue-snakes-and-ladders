<template>
  <div id="app">
    <div>Player: {{game.turn + 1}}</div>
    <div>Die 01: {{dice1}} </div>
    <div>Die 02: {{dice2}} </div>
    <div v-if="game.winner">Winner: Player {{game.turn + 1}}</div>
    <button v-if="!game.winner"
      :disabled="game.walked > 0"
      @click="walkTo(game.turn)">Roll dice</button>
    <transition-group name="move-piece"
      tag="div"
      class="board"
      :style="{'grid-template-areas':boardGrid}">
      <div class="board__square square"
        :class="{'square--higher':square.type === 'higher','square--lower':square.type==='lower' }"
        :style="{'grid-area':'square'+(square.number)}"
        v-for="(square) in board.squares"
        :key="square.number">
        <span class="square__number">{{square.number}}</span>
        <span v-if="square.to"
          class="square__number square__to">{{square.to}}</span>
      </div>
      <div class="piece"
        v-for="(player, index) in players"
        :key="'player-'+index"
        :class="{'player--active':index == game.turn}"
        :style="{'grid-area':'square'+player.position}"></div>
    </transition-group>
  </div>
</template>

<script>
  let currentPiece;
  export default {
    name: "app",
    data () {
      return {
        board: {
          base: 8,
          squares: [],
          specialSquares: [1],
        },
        game: {
          winner: false,
          walked: 0,
          players: 3,
          turn: 0
        },
        players: [
          { position: 1 },
          { position: 1 },
          { position: 1 },
          { position: 1 }
        ],
        dice1: 1,
        dice2: 1
      }
    },
    computed: {
      totalSquares () {
        return this.board.base * this.board.base;
      },
      boardGrid () {
        let grid = "";
        for (let i = this.board.base - 1; i >= 0; i--) {
          let boardRow = '"';
          if (i % 2 === 0) {
            for (let k = i * this.board.base + 1; k < this.board.base * i + this.board.base + 1; k++) {
              boardRow += " square" + k;
            }
            boardRow += '"';
          } else {
            for (let k = this.board.base * i + this.board.base; k > i * this.board.base; k--) {
              boardRow += " square" + k;
            }
            boardRow += '"';
          }
          grid += boardRow;
        }
        return grid.trim();
      }
    },
    methods: {
      rollDice () {
        this.dice1 = Math.floor(Math.random() * 6) + 1;
        this.dice2 = Math.floor(Math.random() * 6) + 1;
      },
      walkTo (player) {
        this.rollDice();
        this.game.walked = this.dice1 + this.dice2;
        this.trywalk(player)
      },
      trywalk (player) {
        currentPiece = document.querySelectorAll('.piece')[player];
        currentPiece.removeEventListener('animationend', walk)
        const walk = () => {
          if (this.game.walked > 0) {
            this.players[player].position++;
            if (this.players[player].position > this.totalSquares) {
              this.players[player].position--;
              this.bounceBack(player)
              currentPiece.removeEventListener('animationend', walk)
            } else {
              this.game.walked--;
              currentPiece.addEventListener('animationend', walk)
            }
          } else {
            this.checkPosition(player)
            currentPiece.removeEventListener('animationend', walk)
          }
        }
        walk();
      },
      bounceBack (player) {
        currentPiece = document.querySelectorAll('.piece')[player];
        currentPiece.removeEventListener('animationend', bounce)
        const bounce = () => {
          if (this.game.walked > 0) {
            this.players[player].position--;
            this.game.walked--;
            currentPiece.addEventListener('animationend', bounce)
          } else {
            this.checkPosition(player)
            currentPiece.removeEventListener('animationend', bounce)
          }
        }
        bounce()
      },
      checkPosition (player) {
        let specialPositions = this.board.squares.map(item => item.from);
        if (specialPositions.includes(this.players[player].position)) {
          let rule = this.board.squares.filter(item => item.from === this.players[player].position)
          this.players[player].position = rule[0].to
        }
        if (this.players[player].position === this.totalSquares) {
          this.game.winner = 'player-' + this.game.turn;
          return false;
        }
        this.nextTurn()
      },
      nextTurn () {
        this.game.turn++;
        if (this.game.turn === this.players.length) {
          this.game.turn = 0;
        }
      },
      chooseRandomSquare (higherOrLower, numberToCompare) {
        this.tries++;
        let specialSquare = Math.floor(Math.random() * (this.totalSquares)) + 1;

        if (higherOrLower === 'lower') {
          let lowerSquares = Array(numberToCompare - 1).fill().map((v, i) => i + 1);
          if (lowerSquares.every(item => this.board.specialSquares.includes(item))) {
            return 'error'
          }
        }

        if (higherOrLower === 'higher') {
          let higherSquares = Array(this.totalSquares - numberToCompare).fill().map((v, i) => i + 1 + numberToCompare);
          if (higherSquares.every(item => this.board.specialSquares.includes(item))) {
            return 'error'
          }
        }

        if (this.board.specialSquares.includes(specialSquare)) {
          return this.chooseRandomSquare(higherOrLower, numberToCompare);
        }

        if (higherOrLower === 'higher' && specialSquare > numberToCompare ||
          higherOrLower === 'lower' && specialSquare < numberToCompare ||
          !higherOrLower) {
          return specialSquare;
        } else {
          return this.chooseRandomSquare(higherOrLower, numberToCompare);
        }
      },
      createGameBoard () {
        for (let i = 1; i < this.totalSquares + 1; i++) {
          this.board.squares = [...this.board.squares, {
            number: i
          }]
        }
        this.board.specialSquares = [...this.board.specialSquares, this.totalSquares]
      },
      createSpecialSquare (higherOrLower) {
        let firstNumber = this.chooseRandomSquare();
        let secondNumber = this.chooseRandomSquare(higherOrLower, firstNumber);
        if (secondNumber === 'error') {
          this.createSpecialSquare(higherOrLower);
        }
        else {
          this.board.specialSquares = [firstNumber, secondNumber, ...this.board.specialSquares]
          this.board.squares = this.board.squares.map(item => item.number === firstNumber ? { ...item, from: firstNumber, to: secondNumber, type: higherOrLower } : item)
        }
      },
    },
    mounted () {
      currentPiece = document.querySelector('.piece');
      this.createGameBoard();
      for (let i = 0; i < Math.floor(this.board.base / 2); i++) {
        this.createSpecialSquare('higher');
        this.createSpecialSquare('lower');
      }
    }
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }
  .board {
    height: 30em;
    width: 30em;
    display: grid;
    position: absolute;
    box-shadow: 0 0 0.5em 0 #77889942;
    border-radius: 3px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }

  .board__square {
    background: #ffffcf;
    padding: 0.5em;
    font-size: 0.7em;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bolder;
    position: relative;
  }

  .board__square:nth-child(even) {
    background: #e3e3b6;
  }

  .square--higher {
    background: lightgreen;
  }

  .square--higher:nth-child(even) {
    background: #77d277;
  }

  .square--lower {
    background: lightpink;
  }

  .square--lower:nth-child(even) {
    background: #f3abb6;
  }

  .square__number {
    position: absolute;
  }

  .square__to {
    color: green;
    bottom: 0.5em;
  }

  .square__to:after {
    content: "\2191";
    font-size: 1.25em;
  }

  .square--lower {
    background: lightpink;
  }
  .square--lower .square__to {
    color: red;
  }
  .square--lower .square__to:after {
    content: "\2193";
  }

  .piece {
    transition: all 0.5s;
    position: relative;
  }
  .piece--active {
    z-index: 10;
  }

  .piece:before {
    content: "";
    position: absolute;
    width: calc(50% - 1em);
    height: calc(50% - 1em);
    background: red;
    top: 0.5em;
    left: 0.5em;
    border-radius: 50%;
    box-shadow: inset 0 0 0 2px darkred, 0 0 0.5em 0 #00000088;
  }
  .piece:nth-last-child(2):before {
    top: auto;
    bottom: 0.5em;
    background: blue;
    box-shadow: inset 0 0 0 2px darkblue, 0 0 0.5em 0 #00000088;
  }
  .piece:nth-last-child(3):before {
    left: auto;
    right: 0.5em;
    background: green;
    box-shadow: inset 0 0 0 2px darkgreen, 0 0 0.5em 0 #00000088;
  }
  .piece:nth-last-child(4):before {
    left: auto;
    top: auto;
    bottom: 0.5em;
    right: 0.5em;
    background: yellow;
    box-shadow: inset 0 0 0 2px darkgoldenrod, 0 0 0.5em 0 #00000088;
  }
  .move-piece-move:before {
    animation: bounce 0.5s linear 0s;
  }

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
