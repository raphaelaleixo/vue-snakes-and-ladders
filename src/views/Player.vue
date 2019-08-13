<template>
  <controls v-if="game.players"
    :game="game"></controls>
</template>

<script>
  import Controls from '@/components/Controls';
  import { mapState } from 'vuex';
  import { mapActions } from 'vuex';
  export default {
    name: "player",
    components: {
      Controls,
    },
    computed: {
      ...mapState(['game']),
    },
    methods: {
      ...mapActions(['loadGame']),
    },
    async mounted () {
      if (!this.game.url) {
        const url = this.$route.params.id;
        await this.loadGame(url);
      }
    }
  };
</script>

<style lang="scss">
</style>