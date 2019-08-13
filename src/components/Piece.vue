<template>
  <div class="piece"></div>
</template>
<style lang="scss">
  .piece {
    transition: all 0.5s;
    position: relative;
  }

  .piece--active {
    z-index: 10;
  }
  .piece:before {
    content: "";
    position: absolute;
    width: 35%;
    height: 35%;
    background: red;
    top: 10%;
    left: 10%;
    border-radius: 50%;
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.5), 0 0 0.5em 0 #00000088;
  }
  .piece:nth-last-child(2):before {
    top: auto;
    bottom: 10%;
    background: blue;
  }
  .piece:nth-last-child(3):before {
    left: auto;
    right: 10%;
    background: green;
  }
  .piece:nth-last-child(4):before {
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
  .move-piece-move:before {
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
