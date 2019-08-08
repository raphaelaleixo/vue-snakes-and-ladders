<template>
  <div id="app">
    <!-- <div>
      Player: {{game.turn + 1}}</div>
    <div>Die 01: {{dice.dice1}} </div>
    <div>Die 02: {{dice.dice2}} </div>
    <div v-if="game.winner">Winner: Player {{game.turn + 1}}</div>
    <button v-if="!game.winner"
      :disabled="dice.locked"
      @click="walkTo(game.turn)">Roll dice</button> -->
    <transition-group name="move-piece"
      tag="div"
      class="board"
      :style="{'grid-template-areas':boardGrid}">
      <square class="board__square square"
        :square="square"
        v-for="(square) in board.squares"
        :key="square.number">
      </square>
      <div class="piece"
        v-for="(player, index) in players"
        :key="'player-'+index"
        :class="{'piece--active':index == game.turn}"
        :style="{'grid-area':'square'+player.position}"></div>
    </transition-group>
  </div>
</template>

<script>
  let currentPiece;
  import Square from '@/components/Square';
  export default {
    name: "app",
    components: {
      Square
    },
    data () {
      return {
        board: {
          squares: [],
          specialSquares: [1],
        },
        game: {
          base: 5,
          winner: false,
          walked: 0,
          playerNumber: 3,
          turn: 0
        },
        players: [],
        dice: {
          locked: false,
          dice1: 1,
          dice2: 1
        }
      }
    },
    computed: {
      totalSquares () {
        return this.game.base * this.game.base;
      },
      boardGrid () {
        let grid = "";
        for (let i = this.game.base - 1; i >= 0; i--) {
          let boardRow = '"';
          if (i % 2 === 0) {
            for (let k = i * this.game.base + 1; k < this.game.base * i + this.game.base + 1; k++) {
              boardRow += " square" + k;
            }
            boardRow += '"';
          } else {
            for (let k = this.game.base * i + this.game.base; k > i * this.game.base; k--) {
              boardRow += " square" + k;
            }
            boardRow += '"';
          }
          grid += boardRow;
        }
        return grid;
      }
    },
    methods: {
      rollDice () {
        this.dice.dice1 = Math.floor(Math.random() * 6) + 1;
        this.dice.dice2 = Math.floor(Math.random() * 6) + 1;
      },
      walkTo (player) {
        this.rollDice();
        this.dice.locked = true;
        this.game.walked = this.dice.dice1 + this.dice.dice2;
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
        this.dice.locked = false;
      },
      chooseRandomSquare (higherOrLower, numberToCompare) {
        let specialSquare = Math.floor(Math.random() * (this.totalSquares)) + 1;
        if (higherOrLower === 'lower') {
          let lowerSquares = Array(numberToCompare - 1).fill().map((v, i) => i + 1);
          if (lowerSquares.every(item => this.board.specialSquares.includes(item))) {
            return false;
          }
        }
        if (higherOrLower === 'higher') {
          let higherSquares = Array(this.totalSquares - numberToCompare).fill().map((v, i) => i + 1 + numberToCompare);
          if (higherSquares.every(item => this.board.specialSquares.includes(item))) {
            return false;
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
            number: i,
            type: ''
          }]
        }
        this.board.squares[this.totalSquares - 1].type = 'goal';
        this.board.specialSquares = [...this.board.specialSquares, this.totalSquares]
        for (let i = 0; i < Math.floor(this.game.base / 2); i++) {
          this.createSpecialSquare('higher');
          this.createSpecialSquare('lower');
        }
      },
      createSpecialSquare (higherOrLower) {
        let firstNumber = this.chooseRandomSquare();
        let secondNumber = this.chooseRandomSquare(higherOrLower, firstNumber);
        if (!secondNumber) {
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
    }
  };
</script>
<style lang="scss">
  .board {
    height: 100%;
    width: 100%;
    display: grid;
    position: absolute;
    top:0;
    left:0;
    background: #f8ffe5;
    box-shadow: 0 0 0.25em 0 #00000040, 0 0 2em 0 #00000020;
    border-radius: 3px;
    overflow: hidden;
    border: 2px solid darken(#ffed66, 25%);
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
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.5), 0 0 0.5em 0 #00000088;
  }
  .piece:nth-last-child(2):before {
    top: auto;
    bottom: 0.5em;
    background: blue;
  }
  .piece:nth-last-child(3):before {
    left: auto;
    right: 0.5em;
    background: green;
  }
  .piece:nth-last-child(4):before {
    left: auto;
    top: auto;
    bottom: 0.5em;
    right: 0.5em;
    background: yellow;
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
      box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.5), 0 0 1em 0 #00000020;
    }
    100% {
      transform: scale(1);
    }
  }
</style>
