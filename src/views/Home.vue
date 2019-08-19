<template>
  <div class="home">
    <h2 class="home__title">A realtime,<br />multiplayer boardgame!</h2>
    <p class="home__text">Select the number of players, the size of your game board and start playing now!</p>
    <game-settings />
  </div>
</template>
<script>
  import GameSettings from '@/components/GameSettings';

  export default {
    components: {
      GameSettings
    }
  }
</script>
<style lang="scss" scoped>
  .home {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
  }
  .home__title,
  .home__text {
    margin: 0 0 0.5em;
  }
  .home__title {
    font-size: 2em;
    line-height: 1;
    letter-spacing: -0.5px;
  }
</style>
