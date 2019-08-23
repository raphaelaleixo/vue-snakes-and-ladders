<template>
  <header class="header">
    <game-header-logo />
    <nav class="header__nav nav">
      <ul class="nav__list">
        <li class="nav__item"><a class="nav__link"
            href="#">Tutorial</a></li>
        <li class="nav__item"><a class="nav__link"
            href="https://github.com/raphaelaleixo/vue-snakes-and-ladders">Github</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
  import GameHeaderLogo from '@/components/GameHeaderLogo'
  export default {
    components: {
      GameHeaderLogo
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 0;
    @media screen and (max-width: 90em) {
      flex-wrap: wrap;
    }
  }
  .nav__list {
    list-style-type: none;
    display: flex;
    margin: 0;
    padding: 0;
  }
  .nav__item {
    margin: 0 0 0 1em;
  }
  .nav__link {
    color: #00cecb;
    text-decoration: none;
    transition: color 0.3s ease-out;
    &:hover {
      color: darken(#00cecb, 20%);
      text-decoration: underline;
    }
  }
</style>