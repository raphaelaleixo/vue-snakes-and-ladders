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
    <board v-if="game.board"
      :game="game" />
  </div>
</template>

<script>
  import Board from '@/components/Board';
  import { mapState } from 'vuex';
  import { mapActions } from 'vuex';
  export default {
    name: "game",
    components: {
      Board,
    },
    computed: {
      ...mapState(['game']),
    },
    methods: {
      ...mapActions(['loadGame']),
    },
    async mounted () {
      if (!this.game.url) {
        const url = this.$route.params.id;
        await this.loadGame(url);
      }
    }
  };
</script>
