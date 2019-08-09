<template>
  <div class="card__face">
    <h1>Ups&Downs</h1>
    <form @submit.prevent="addGame(game)" class="settings">
      <div class="settings__wrapper">
        <label class="settings__label" for="">Número de jogadores:</label>
        <input type="range" min="2" max="4" v-model="game.numberOfPlayers" />
        <output>{{game.numberOfPlayers}}</output>
      </div>
      <div class="settings__wrapper">
        <label class="settings__label" for="">Número de casas:</label>
        <input type="range" min="3" max="10" v-model="game.board" />
        <output>{{game.board * game.board}}</output>
      </div>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      game: {
        numberOfPlayers: 2,
        board: 8
      }
    }
  },
  methods: {
    ...mapActions(['addGame'])
  }
}
</script>
<style lang="scss">
  .card__face {
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    background:#ffffff;
  }
</style>
