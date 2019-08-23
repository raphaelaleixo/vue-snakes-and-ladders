<template>
  <controls v-if="game.players"
    :game="game"
    :playerRanking="playerRanking"></controls>
</template>

<script>
  import Controls from "@/components/Controls";
  import { mapState } from "vuex";
  import { mapGetters } from 'vuex';
  import { mapActions } from "vuex";
  export default {
    name: "player",
    components: {
      Controls
    },
    computed: {
      ...mapState(["game"]),
      ...mapGetters(['playerRanking'])
    },
    methods: {
      ...mapActions(["loadGame"])
    },
    async mounted () {
      if (!this.game.gameId) {
        const gameId = this.$route.params.id;
        await this.loadGame(gameId);
      }
    }
  };
</script>

<style lang="scss">
</style>