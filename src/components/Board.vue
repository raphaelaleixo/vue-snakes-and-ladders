<template>
  <div>
    <div class="board"
      :style="{'grid-template-areas':boardGrid}">
      <square :square="square"
        v-for="square in game.board.squares"
        :key="'square-'+square.number">
      </square>
    </div>
    <transition-group name="move-piece"
      tag="div"
      class="board"
      :style="{'grid-template-areas':boardGrid}">
      <piece v-for="player in game.players"
        :key="'player-'+player.number"
        :style="{'grid-area':'square'+player.position}"
        :player="player" />
    </transition-group>
  </div>
</template>

<script>
  import Square from '@/components/Square';
  import Piece from '@/components/Piece';
  export default {
    name: "board",
    props: {
      game: Object
    },
    components: {
      Square,
      Piece
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
<style lang="scss">
  .board {
    height: 100%;
    width: 100%;
    display: grid;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 0 0.25em 0 #00000040, 0 0 2em 0 #00000020;
    border-radius: 3px;
    overflow: hidden;
    border: 2px solid darken(#ffed66, 25%);
  }
</style>
