<template>
  <div class="card__face">
    <h1>Ups&Downs</h1>
    <form @submit.prevent="createNewGame"
      class="settings">
      <div class="settings__wrapper">
        <label class="settings__label"
          for="">Número de jogadores:</label>
        <input type="range"
          min="2"
          max="4"
          v-model="newgame.numberOfPlayers" />
        <output>{{newgame.numberOfPlayers}}</output>
      </div>
      <div class="settings__wrapper">
        <label class="settings__label"
          for="">Número de casas:</label>
        <input type="range"
          min="3"
          max="10"
          v-model="newgame.base" />
        <output>{{newgame.base * newgame.base}}</output>
      </div>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import { mapState } from 'vuex';
  export default {
    data () {
      return {
        newgame: {
          numberOfPlayers: 2,
          base: 8
        }
      }
    },
    computed: {
      ...mapState(['game'])
    },
    methods: {
      ...mapActions(['addGame']),
      async createNewGame () {
        const teste = await this.addGame(this.newgame);
        this.$router.push('/game/' + this.game.url);
      }
    }
  }
</script>
<style lang="scss">
  .card__face {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #ffffff;
  }
</style>
