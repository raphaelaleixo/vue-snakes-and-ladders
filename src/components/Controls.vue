<template>
  <div class="player">
    <h1>Player {{activePlayer}}</h1>
    <h2>Your position: {{activeRanking}}</h2>
    <button @click="rollDice"
      :disabled="!isMyTurn">Roll dice!</button>
  </div>
</template>

<script>

  import { mapActions } from "vuex";
  export default {
    props: {
      game: Object,
      playerRanking: Array
    },
    data () {
      return {
        activePlayer: ""
      };
    },
    computed: {
      activeTurn () {
        return (this.game.turn % this.game.numberOfPlayers) + 1;
      },
      actualPlayer () {
        return this.game.players[this.$route.params.player - 1];
      },
      isMyTurn () {
        return (
          this.game.winner === false && this.activeTurn == this.activePlayer && this.game.dice.locked === false
        );
      },
      activeRanking () {
        const checkRank = item => item.number == this.$route.params.player;
        return this.playerRanking.findIndex(checkRank) + 1;
      }
    },
    methods: {
      ...mapActions(["updateDice", "updatePlayerStatus"]),
      rollDice () {
        this.updateDice({
          ...this.game,
          dice: {
            dice1: Math.floor(Math.random() * 6) + 1,
            dice2: Math.floor(Math.random() * 6) + 1,
            locked: true
          }
        });
      }
    },
    created () {
      this.activePlayer = this.$route.params.player;
      this.updatePlayerStatus({ game: this.game, player: this.actualPlayer });
    }
  };
</script>
<style lang="scss" scoped>
  .player {
    text-align: center;
  }
</style>
