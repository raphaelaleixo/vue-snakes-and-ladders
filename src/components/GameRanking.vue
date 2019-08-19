<template>
  <div class="ranking">
    <h2 class="ranking__title">Player {{actualPlayer}}'s turn</h2>
    <transition-group name="move-ranking">
      <div class="ranking__item"
        v-for="(player) in playerRanking"
        :key="player.number"
        :style="{'color':defs.playerColors[player.number -1]}">
        <div class="ranking__player player">
          <div class="player__name">Player {{player.number}}</div>
          <a class="player__url"
            :href="url + '/' + player.number">{{url}}/{{player.number}}</a>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    props: {
      game: Object,
      defs: Object,
    },
    computed: {
      ...mapGetters(['playerRanking', 'actualPlayer']),
      url () {
        return window.location.protocol + '//' + window.location.hostname + this.port + '/game/' + this.$route.params.id;
      },
      port () {
        return + window.location.port ? ':' + window.location.port : ''
      }
    }
  };
</script>

<style lang="scss" scoped>
  .ranking__title {
    margin: 0;
  }
  .ranking__item {
    transition: all 1s;
    padding: 0.5em 1em;
    background: #fff;
    margin: 1em 0;
    border-radius: 8px;
    box-shadow: 0 0 0.25em 0 #00000010;
  }
  .player__name {
    font-weight: bolder;
  }
  .player__url {
    color: inherit;
    font-size: 0.875em;
  }
</style>