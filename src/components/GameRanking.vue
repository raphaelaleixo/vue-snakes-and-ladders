<template>
  <div class="ranking">
    <h2 class="ranking__title">Player {{actualPlayer}}'s turn</h2>
    <transition-group name="move-ranking">
      <game-ranking-player
        v-for="(player) in playerRanking"
        :key="player.number"
        :player="player"
        :style="{'color':defs.playerColors[player.number -1]}">    
      </game-ranking-player>
    </transition-group>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import GameRankingPlayer from '@/components/GameRankingPlayer'
  export default {
    components: {
      GameRankingPlayer
    },
    props: {
      game: Object,
      defs: Object,
    },
    computed: {
      ...mapGetters(['playerRanking', 'actualPlayer'])
    }
  };
</script>

<style lang="scss" scoped>
  .ranking__title {
    margin: 0;
  }
 
</style>