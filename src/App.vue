<template>
  <div id="app">
    <transition-group name="list-complete"
      tag="div"
      class="grid"
      :style="{'grid-template-areas':boardGrid}">
      <div class="grid__item square"
        :class="{'square--higher':square.type === 'higher','square--lower':square.type==='lower' }"
        :style="{'grid-area':'square'+(square.number)}"
        v-for="(square) in gameBoard"
        :key="square.number">
        {{square.number}}
        <span v-if="square.to"
          class="square__to">{{square.to}}</span>
      </div>
      <div class="piece"
        @click="walkTo(3)"
        key="piece1"
        :style="{'grid-area':'square'+position}"></div>
    </transition-group>
  </div>
</template>

<script>
  let timeout;
  export default {
    name: "app",
    data () {
      return {
        gameBoard: [],
        board: 4,
        position: 1,
        walked: 0,
        tries: 0,
        specialSquares: [],
        dice1: 1,
        dice2: 1
      }
    },
    computed: {
      boardSquares () {
        return this.board * this.board;
      },
      boardGrid () {
        let grid = "";
        for (let i = this.board - 1; i >= 0; i--) {
          let boardRow = '"';
          if (i % 2 === 0) {
            for (let k = i * this.board + 1; k < this.board * i + this.board + 1; k++) {
              boardRow += " square" + k;
            }
            boardRow += '"';
          } else {
            for (let k = this.board * i + this.board; k > i * this.board; k--) {
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
      walkTo () {
        this.rollDice();
        this.walked = this.dice1 + this.dice2;
        this.trywalk()
      },
      trywalk () {
        clearTimeout(timeout)
        if (this.walked > 0) {
          this.position++;
          if (this.position > this.boardSquares) {
            this.position--;
            this.bounceBack()
          } else {
            this.walked--;
            timeout = setTimeout(() => this.trywalk(), 300);
          }
        } else {
          this.checkPosition()
        }
      },
      bounceBack () {
        clearTimeout(timeout)
        if (this.walked > 0) {
          this.position--;
          this.walked--;
          timeout = setTimeout(() => this.bounceBack(), 300);
        } else {
          this.checkPosition()
        }
      },
      checkPosition () {
        let specialPositions = this.gameBoard.map(item => item.from);
        if (specialPositions.includes(this.position)) {
          let rule = this.gameBoard.filter(item => item.from === this.position)
          this.position = rule[0].to
        }
      },
      chooseRandomSquare (higherOrLower, numberToCompare) {
        this.tries++;
        if (numberToCompare === 'error' || this.tries > 10) {
          this.tries = 0;
          return 'error';
        }
        let specialSquare = Math.floor(Math.random() * (this.boardSquares - 3)) + 2;
        if ((higherOrLower === 'higher' && specialSquare < numberToCompare) || this.specialSquares.includes(specialSquare)) {
          return this.chooseRandomSquare(higherOrLower, numberToCompare)
        }
        else if ((higherOrLower === 'lower' && specialSquare > numberToCompare) || this.specialSquares.includes(specialSquare)) {
          return this.chooseRandomSquare(higherOrLower, numberToCompare)
        }
        else if (this.specialSquares.includes(specialSquare)) {
          return this.chooseRandomSquare(higherOrLower, numberToCompare);
        }
        else {
          this.specialSquares = [specialSquare, ...this.specialSquares]
          return specialSquare;
        }
      },
      createGameBoard () {
        for (let i = 1; i < this.boardSquares + 1; i++) {
          this.gameBoard = [...this.gameBoard, {
            number: i
          }]
        }
      },
      createSpecialSquare (higherOrLower) {
        let firstNumber = this.chooseRandomSquare();
        let secondNumber = this.chooseRandomSquare(higherOrLower, firstNumber);
        if (secondNumber === 'error') {
          this.createSpecialSquare(higherOrLower);
        }
        else {
          this.gameBoard = this.gameBoard.map(item => item.number === firstNumber ? { ...item, from: firstNumber, to: secondNumber, type: higherOrLower } : item)
        }
      },
    },
    mounted () {
      this.createGameBoard();
      for (let i = 0; i < Math.floor(this.board / 2); i++) {
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
  .grid {
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

  .grid__item {
    background: #ffffcf;
    padding: 0.5em;
    font-size: 0.7em;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bolder;
  }

  .grid__item:nth-child(even) {
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

  .square__to {
    position: absolute;
    color: green;
    display: block;
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
    transition: all 0.3s;
    position: relative;
  }

  .piece:before {
    content: "";
    position: absolute;
    width: 25%;
    height: 25%;
    background: red;
    top: 0.5em;
    left: 0.5em;
    border-radius: 50%;
    box-shadow: inset 0 0 0 2px darkred, 0 0 0.5em 0 #00000088;
  }

  .list-complete-leave-active {
    position: absolute;
    pointer-events: none;
  }

  .list-complete-move:before {
    animation: walk 0.3s linear 0s;
  }

  @keyframes walk {
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
