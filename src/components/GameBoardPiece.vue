<template>
  <div class="piece">
    <div class="piece__circle"
      :style="{'background-color':color}"></div>
  </div>
</template>
<script>
  export default {
    props: {
      color: String,
    },

  }
</script>

<style lang="scss">
  .piece {
    transition: all 0.5s;
    position: relative;
  }

  .piece--active {
    z-index: 10;
  }
  .piece__circle {
    position: absolute;
    width: 35%;
    height: 35%;
    background: red;
    top: 10%;
    left: 10%;
    border-radius: 50%;
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.5), 0 0 0.5em 0 #00000088;
  }
  .piece:nth-last-child(2) .piece__circle {
    top: auto;
    bottom: 10%;
    background: blue;
  }
  .piece:nth-last-child(3) .piece__circle {
    left: auto;
    right: 10%;
    background: green;
  }
  .piece:nth-last-child(4) .piece__circle {
    left: auto;
    top: auto;
    bottom: 10%;
    right: 10%;
    background: yellow;
  }
  .move-piece {
    transition: all 1s;
  }
  .move-piece-move {
    z-index: 10;
  }
  .move-piece-move .piece__circle {
    animation: bounce 0.5s linear 0s;
  }
  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
      box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.5), 0 0 1em 0 #00000020;
    }
    100% {
      transform: scale(1);
    }
  }
</style>
