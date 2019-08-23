<template>
  <h2 class="ranking__title">
    <span v-if="game.winner">Player {{game.winner}} won!</span>
    <span v-else>It's player {{actualPlayer + 1}}'s turn!</span>
  </h2>
</template>

<script>
  export default {
    props: {
      game: Object,
      actualPlayer: Number
    }
  }
</script>

<style lang="scss" scoped>
  .ranking__title {
    margin: 0;
  }
</style>