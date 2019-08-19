<template>
  <div class="ranking__item">
    <div class="ranking__player player">    
      <div class="player__name">Player {{player.number}}
          <span class="player__status" :class="{'player__status--online':isOnline}"></span>
      </div>
      <a class="player__url" :href="url + '/' + player.number">{{url}}/{{player.number}}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: Object
  },
  computed: {
    isOnline() {
      return this.player.status && this.player.status === "online";
    },
    url() {
      return (
        window.location.protocol +
        "//" +
        window.location.hostname +
        this.port +
        "/game/" +
        this.$route.params.id
      );
    },
    port() {
      return +window.location.port ? ":" + window.location.port : "";
    }
  }
};
</script>

<style lang="scss" scoped>
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
  position:relative;
  padding-left:1em;
  line-height: 1;
}
.player__url {
  color: inherit;
  font-size: 0.875em;
}
.player__status {
    width:0.5em;
    height:0.5em;
    left:0;
    top:0.25em;
    position: absolute;
    background: #ff5e5b;
    border-radius: 50%;
    &.player__status--online {
        background: #7fb800;
    }
}
</style>