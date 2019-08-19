<template>
  <div>
    <h1>Você é o jogador {{activePlayer}}</h1>
    <h2>Esse é o turno do jogador {{game.turn % game.numberOfPlayers + 1}}</h2>
    <button @click="rollDice" :disabled="!isMyTurn">Jogar dados</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    game: Object
  },
  data() {
    return {
      activePlayer: ""
    };
  },
  computed: {
    activeTurn() {
      return (this.game.turn % this.game.numberOfPlayers) + 1;
    },
    actualPlayer() {
      return this.game.players[this.$route.params.player - 1];
    },
    isMyTurn() {
      return (
        this.activeTurn == this.activePlayer && this.game.dice.locked === false
      );
    }
  },
  methods: {
    ...mapActions(["updateDice", "updatePlayerStatus"]),
    rollDice() {
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
  created() {
    this.activePlayer = this.$route.params.player;
    this.updatePlayerStatus({ game: this.game, player: this.actualPlayer });
  }
};
</script>