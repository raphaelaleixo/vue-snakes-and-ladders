<template>
  <div class="game">
    <div class="game__players">
      <game-ranking :game="game" v-if="game.players"/>
    </div>
    <div class="game__main">
      <div class="game__board">
        <game-board v-if="game.board"
          :game="game" /> 
      </div>
    </div>
    <div class="game__dice">
      <game-dice :game="game" v-if="game.dice"/>

    </div>
  </div>
</template>

<script>
  import GameBoard from '@/components/GameBoard';
  import GameRanking from '@/components/GameRanking';
  import GameDice from '@/components/GameDice';
  import rules from '@/api/rules';
  import { mapState } from 'vuex';
  import { mapActions } from 'vuex';
  export default {
    name: "game",
    components: {
      GameBoard,
      GameDice,
      GameRanking
    },
    watch: {
      game: function (state) {
        if (state.serverUpdate && state.dice.locked === true) {
          rules.playTurn(state, this.actualPlayer, this.setLocalGame, this.updateGame);
        }
      }
    },
    computed: {
      ...mapState(['game']),
      actualPlayer() {
        return this.game.turn % this.game.numberOfPlayers;
      }
    },
    methods: {
      ...mapActions(['loadGame','setLocalGame','updateGame']),
    },
    async mounted () {
      if (!this.game.gameId) {
        const gameId = this.$route.params.id;
        await this.loadGame(gameId);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .game {
    display: contents;
  }
  .game__main {
      grid-area:main;
      display:flex;
      align-items:center;
  }
  .game__board {
    position:relative;
    width:100%;
    padding-bottom:100%;
  }
  .game__dice {
    grid-area:right;
  }
</style>

