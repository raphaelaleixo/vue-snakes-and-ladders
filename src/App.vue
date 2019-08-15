<template>
  <div id="app"
    class="wrapper">
    <header>
      <h1><router-link to='/'>Ups&Downs</router-link></h1>
      <nav>
        <ul>
          <li><a href="#">Tutorial</a></li>
          <li><a href="#">Github</a></li>
        </ul>
      </nav>
    </header>
    <div class="card">
      <div class="card__wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

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
