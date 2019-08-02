<template>
  <div id="app">
    <div class="grid" :style="{'grid-template-areas':boardGrid}">
      <div
        class="grid__item"
        :style="{'grid-area':'square'+(square)}"
        v-for="(square,index) in boardSquares"
        :key="index"
      >{{square}}</div>
    </div>
    <transition-group name="list-complete" class="grid" tag="div" :style="{'grid-template-areas':boardGrid}">
      <div class="piece" @click="walkTo(3)" key="piece1" :style="{'grid-area':'square'+position}"></div>
    </transition-group>
  </div>
</template>

<script>
let timeout;
export default {
  name: "app",
  data() {
    return {
      board:8,
      position: 1,
      walked:0,
      specialSquares:[]
    }
  },
  computed: {
    boardSquares() {
      return this.board * this.board;
    },
    boardGrid() {
      let grid = "";
      for (let i = this.board - 1; i >= 0; i--) {
        let boardRow = '"';
        if (i % 2 === 0) {
          for (let k = i * this.board + 1; k < this.board * i + this.board + 1; k++ ) {
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
    walkTo(number) {
      this.walked = number;
      this.trywalk()
    },
    trywalk() {
      clearTimeout(timeout)
      if (this.walked > 0) {
        this.walked --;
        this.position++;
        if (this.position > this.boardSquares) {
          this.position= this.boardSquares;
        }
        timeout = setTimeout(() => this.trywalk(), 300);
      }
    },
    chooseRandomSquare(higherOrLower, numberToCompare) {
      let specialSquare = Math.floor(Math.random() * this.boardSquares) + 1;
      if ((higherOrLower==='higher' && specialSquare < numberToCompare) || this.specialSquares.includes(specialSquare)) {
        return this.chooseRandomSquare('higher',numberToCompare) 
      }
      else if ((higherOrLower==='lower' && specialSquare > numberToCompare) || this.specialSquares.includes(specialSquare)) {
        return this.chooseRandomSquare('lower',numberToCompare) 
      }
      else if (this.specialSquares.includes(specialSquare)) {
        return this.chooseRandomSquare() 
      }
      else {
        this.specialSquares = [specialSquare,...this.specialSquares]
        return specialSquare;
      }
    },
    createLadder() {
      let firstNumber = this.chooseRandomSquare();
      let secondNumber = this.chooseRandomSquare('higher',firstNumber);
    }
  },
  mounted() {
    this.createLadder();
    this.createLadder();
  }
};
</script>

<style>
.grid {
  height:30em;
  width:30em;
  display: grid;
  position: absolute;
  box-shadow: 0 0 0.5em 0 #77889942;
  border-radius:3px;
  top: 50%;
  left: 50%;
  transform:translate(-50%,-50%);
  overflow:hidden;
}

.grid__item {
  background:#ffffcf;
  padding:0.5em;
  font-size:0.7em;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bolder;
}

.grid__item:nth-child(even) {
  background:#e3e3b6
}

.piece {
  transition: all 0.3s;
  position:relative;
}

.piece:before {
  content:'';
  position:absolute;
  width:25%;
  height:25%;
  background: red;
  top:0.5em;
  left:0.5em;
  border-radius:50%;
  box-shadow:inset 0 0 0 2px darkred, 0 0 0.5em 0 #00000088;
}

.list-complete-leave-active {
  position: absolute;
  pointer-events:none;
}

.list-complete-move:before{
  animation: walk 0.3s linear 0s
}

@keyframes walk {
    0%   {transform:scale(1)}
    50%  {transform:scale(1.5)}
    100% {transform:scale(1)}
}
</style>
