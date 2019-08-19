<template>
  <div>
    <div class="board board--base"
      :style="{'grid-template-areas':boardGrid}">
      <game-board-square :square="square"
        v-for="square in game.board.squares"
        :key="'square-'+square.number" />
    </div>
    <transition-group name="move-piece"
      tag="div"
      class="board"
      :style="{'grid-template-areas':boardGrid}">
      <game-board-piece v-for="player in game.players"
        :key="'player-'+player.number"
        :color="defs.playerColors[player.number -1]"
        :style="{'grid-area':'square'+player.position,
                 'transition-duration':defs.transitionTime+'ms'}"
        :player="player" />
    </transition-group>
  </div>
</template>

<script>
  import GameBoardSquare from '@/components/GameBoardSquare';
  import GameBoardPiece from '@/components/GameBoardPiece';
  export default {
    name: "board",
    props: {
      game: Object,
      defs: Object
    },
    components: {
      GameBoardSquare,
      GameBoardPiece
    },
    computed: {
      boardGrid () {
        let grid = "";
        let base = parseInt(this.game.base);
        for (let i = this.game.base - 1; i >= 0; i--) {
          let boardRow = '"';
          if (i % 2 === 0) {
            for (let k = i * base + 1; k < base * i + base + 1; k++) {
              boardRow += " square" + k;
            }
            boardRow += '"';
          } else {
            for (let k = base * i + base; k > i * base; k--) {
              boardRow += " square" + k;
            }
            boardRow += '"';
          }
          grid += boardRow;
        }
        return grid;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .board {
    height: 100%;
    width: 100%;
    display: grid;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
    overflow: hidden;
    border: 2px solid darken(#ffed66, 25%);
    &.board--base {
      box-shadow: 0 0 0.25em 0 #00000040, 0 0 2em 0 #00000020;
    }
    &:not(.board--base) {
      pointer-events: none;
    }
  }
</style>
