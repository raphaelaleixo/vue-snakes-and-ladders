<template>
  <div class="piece"
    :class="{'piece--active':index == game.turn}"
    ></div>
</template>

<script>
  export default {
    props: {
      game: Object,
      player: Object
    }
  }
</script>

<style lang="scss" scoped>
</style>