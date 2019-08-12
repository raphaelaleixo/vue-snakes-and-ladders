<template>
<div>
    <div class="board" :style="{'grid-template-areas':boardGrid}">
      <square :square="square"
        v-for="square in game.board.squares"
        :key="'square-'+square.number">
      </square>
    </div>
    <transition-group name="move-piece"
      tag="div"
      class="board"
      :style="{'grid-template-areas':boardGrid}">
      <piece v-for="player in players"
        :key="'player-'+player.number"
        :style="{'grid-area':'square'+player.position}"
        :player="player" />
    </transition-group>
  </div>
</template>

<script>
  import Square from '@/components/Square';
  import Piece from '@/components/Piece';
  import {mapActions} from 'vuex';
  export default {
    name: "board",
    data () {
      return {
        players: [],
        walked: 0,
        turn:0,
        transition: 500
      }
    },
    props: {
      game: Object
    },
    components: {
      Square,
      Piece
    },
    computed: {
      totalSquares () {
        return this.game.base * this.game.base;
      },
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
    },
    watch: {
      game: function (state) {
        if (state.dice.locked === true) {
          this.walkTo(state.dice.dice1 + state.dice.dice2, this.game.turn % this.game.numberOfPlayers);
        }
      }
    },
    methods: {
      ...mapActions(['updateGame']),
      setupBoard () {
        this.players = this.game.players.map((item, index) => ({ ...item, number: index }))
        this.turn = this.game.turn;
      },
      rollDice () {
        this.game.dice.dice1 = Math.floor(Math.random() * 6) + 1;
        this.game.dice.dice2 = Math.floor(Math.random() * 6) + 1;
      },
      walkTo (value, player) {
        this.walked = value;
        this.trywalk(player)
      },
      trywalk (player) {
        const walk = () => {
          if (this.walked > 0) {
            this.players[player].position++;
            if (this.players[player].position > this.totalSquares) {
              this.players[player].position--;
              this.bounceBack(player)
            } else {
              this.walked--;
              setTimeout(walk,500)
            }
          } else {
            this.checkPosition(player)
          }
        }
        walk();
      },
      bounceBack (player) {
        const bounce = () => {
          if (this.walked > 0) {
            this.players[player].position--;
            this.walked--;
            setTimeout(bounce,500)
          } else {
            this.checkPosition(player)
          }
        }
        bounce()
      },
      checkPosition (player) {
        let specialPositions = this.game.board.squares.map(item => item.from);
        if (specialPositions.includes(this.players[player].position)) {
          let rule = this.game.board.squares.filter(item => item.from === this.players[player].position)
          this.players[player].position = rule[0].to
        }
        if (this.players[player].position === this.totalSquares) {
          this.game.winner = 'player-' + this.game.turn % this.game.numberOfPlayers;
          this.updateGame({
            ...this.game,
            players: [...this.players]
          })
          return false;
        }
        this.nextTurn()
      },
      nextTurn () {
        this.game.dice.locked = false;
        this.turn++;
        this.updateGame({
            ...this.game,
            turn: this.turn,
            players: [...this.players]
        })
      }
    },
    created () {
      this.setupBoard();
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
    width: 35%;
    height: 35%;
    background: red;
    top: 10%;
    left: 10%;
    border-radius: 50%;
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.5), 0 0 0.5em 0 #00000088;
  }
  .piece:nth-last-child(2):before {
    top: auto;
    bottom: 10%;
    background: blue;
  }
  .piece:nth-last-child(3):before {
    left: auto;
    right: 10%;
    background: green;
  }
  .piece:nth-last-child(4):before {
    left: auto;
    top: auto;
    bottom: 10%;
    right: 10%;
    background: yellow;
  }
  .move-piece {
    transition: all 1s;
  }
  .move-piece-move {
    z-index:10;
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
