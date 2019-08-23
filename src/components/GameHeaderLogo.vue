<template>
  <h1 class="logo">
    <router-link to='/'
      class="logo__link">
      <span class="logo__up">Ups</span>&
      <span class="logo__break"><span class="logo__down">Downs</span></span>
    </router-link>
  </h1>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  .logo {
    font-size: 2.5em;
    letter-spacing: -1px;
    line-height: 0.8;
    margin: 0;
  }
  .logo__link {
    color: inherit;
    text-decoration: none;
  }
  .logo__break {
    display: block;
    margin-left: 1.5ch;
  }
  .logo__up {
    color: #00cecb;
  }
  .logo__down {
    color: #ff5e5b;
  }
</style>