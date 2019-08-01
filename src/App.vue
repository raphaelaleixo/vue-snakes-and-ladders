<template>
  <div id="app">
    {{walked}}
    <div class="grid" :style="{'grid-template-areas':boardGrid}">
      <div
        class="grid__item"
        :style="{'grid-area':'square'+(square)}"
        v-for="(square,index) in boardSquares"
        :key="index"
      >{{square}}</div>
    </div>
    <transition-group name="list-complete" class="grid" tag="div" :style="{'grid-template-areas':boardGrid}">
      <div class="piece" @click="walkTo(6)" key="piece1" :style="{'grid-area':'square'+position}"></div>
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
      walked:0
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
          for (
            let k = i * this.board + 1;
            k < this.board * i + this.board + 1;
            k++
          ) {
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
        timeout = setTimeout(() => this.trywalk(), 1000);
      }
    }
  }
};
</script>

<style>
.grid {
  height: 100vh;
  display: grid;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.piece {
  transition: all 0.3s;
  border: 1px solid red;
  transition: all 1s;
}

.piece1 {
  grid-area: 8 / 1 / 8 / 1;
}

.piece2 {
  grid-area: 8 / 2 / 8 / 2;
}

.list-complete-leave-active {
  position: absolute;
  pointer-events:none;
}
</style>
