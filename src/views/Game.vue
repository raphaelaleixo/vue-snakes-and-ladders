<template>
  <board v-if="game.board"
    :game="game" />
</template>

<script>
  import Board from '@/components/Board';
  import { mapState } from 'vuex';
  import { mapActions } from 'vuex';
  export default {
    name: "game",
    components: {
      Board,
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
