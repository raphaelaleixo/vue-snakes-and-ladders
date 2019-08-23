<template>
  <div class="dice__wrapper">
    <game-dice-die :die="game.dice.dice1"
      :turn="game.dice.locked"
      :defs="defs.dice" />
    <game-dice-die :die="game.dice.dice2"
      :defs="defs.dice"
      :turn="game.dice.locked" />
  </div>
</template>

<script>
  import GameDiceDie from '@/components/GameDiceDie'
  export default {
    components: {
      GameDiceDie
    },
    props: {
      game: Object,
      defs: Object
    }
  };
</script>

<style lang="scss" scoped>
  .dice__wrapper {
    width: 100%;
    margin: 1em 0;
    height: 3em;
    display: flex;
    perspective: 99999px;
  }
</style>