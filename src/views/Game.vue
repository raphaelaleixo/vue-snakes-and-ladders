<template>
  <board v-if="game.board"
    :game="game" />
</template>

<script>
  import Board from '@/components/Board';
  import rules from '@/api/rules';
  import { mapState } from 'vuex';
  import { mapActions } from 'vuex';
  export default {
    name: "game",
    components: {
      Board,
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
      if (!this.game.url) {
        const url = this.$route.params.id;
        await this.loadGame(url);
      }
    }
  };
</script>
