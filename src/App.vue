<template>
  <div id="app"
    class="wrapper">
    <game-header/>
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
  
  @import url('https://fonts.googleapis.com/css?family=Poppins:900&display=swap');
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
    height:100vh;
  }
  .wrapper {
    display:grid;
    max-width: 90em;
    height:100vh;
    margin:0 auto;
    grid-column-gap: 1em;
    grid-template-columns: 1fr 70vh 1fr;
    grid-template-rows: 5em 1fr 5em;
    grid-template-areas: 
      "header header header"
      "left main right"
      "footer footer footer";
  }
</style>
