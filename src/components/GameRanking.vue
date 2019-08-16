<template>
  <div>
    <h2>Players</h2>
    <div v-for="player in ranking" :key="player.number">Player {{player.number}} - {{player.position}}</div>
  </div>
</template>

<script>
export default {
  props: {
    game: Object
  },
  computed: {
    ranking() {
      let players = [...this.game.players];
      return players.sort((a, b) => {
        if (a.position > b.position) {
          return -1;
        }
        if (a.position < b.position) {
          return 1;
        }
        return 0;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>