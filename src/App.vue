<template>
  <div id="app"
    class="wrapper">
    <div class="card">
      <div class="card__wrapper">
        <router-view />
      </div>
    </div>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/board">About</router-link> -->
  </div>
</template>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Quicksand:700&display=swap");
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
    font-family: "Quicksand", sans-serif;
    height:100vh;
  }
  .wrapper {
    display:flex;
    align-items:center;
    justify-content: center;
    height:100%;
  }
  .card {
    width: 70vh;
    max-width: 90%;
  }
  .card__wrapper {
    padding-bottom: 100%;
    position: relative;
  }
</style>
