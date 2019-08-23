<template>
  <div id="app"
    class="wrapper">
    <game-header />
    <router-view />
  </div>
</template>

<script>
  import GameHeader from '@/components/GameHeader'
  export default {
    components: {
      GameHeader
    }
  }
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Poppins:400,900&display=swap");
  * {
    box-sizing: border-box;
    &:before,
    &:after {
      box-sizing: inherit;
    }
  }
  body {
    margin: 0;
    padding: 0;
    background: #ffffea;
    font-family: "Poppins", sans-serif;
    height: 100vh;
  }
  .wrapper {
    display: grid;
    max-width: 90em;
    height: 100vh;
    padding: 0 2em;
    margin: 0 auto;
    grid-gap: 1em 2em;
    grid-template-columns: 1fr 75vh 1fr;
    grid-template-rows: 6em 75vh;
    grid-template-areas:
      "header header header"
      "left main right ";
    @media screen and (max-width: 90em) {
      width: calc(100% - 2em);
      grid-template-columns: auto;
      grid-template-rows: auto auto calc(100vw - 2em) auto;
      grid-template-areas:
        "header"
        "left"
        "main"
        "right";
      padding: 0;
    }

    button {
      appearance: none;
      border: none;
      background: #ff5e5b;
      font-weight: bolder;
      border-radius: 2em;
      padding: 1em 2em;
      text-transform: uppercase;
      font-size: 1em;
      color: #fff;
      font-family: "Poppins", sans-serif;
      margin: 1em 0;
      transition: background-color 0.3s ease-out;
      &:disabled {
        background: #cabcbc;
      }
    }
  }
</style>
