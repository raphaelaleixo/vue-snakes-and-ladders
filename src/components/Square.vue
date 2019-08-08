<template>
  <div class="board__square square"
    :class="'square--'+square.type"
    :style="{'grid-area':'square'+(square.number)}">
    <span class="square__number">{{squareText}}</span>
    <span v-if="square.to"
      class="square__number square__to">{{square.to}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      square: Object
    },
    computed: {
      squareText () {
        return this.square.type === 'goal' ? 'Goal!' : this.square.number
      }
    }
  }
</script>

<style lang="scss">
  @mixin square($color) {
    background-color: $color;
    color: darken($color, 50%);
    &:nth-child(even) {
      background-color: rgba($color, 0.7);
    }
  }
  .board__square {
    padding: 0.5em;
    font-size: 0.8em;
    font-weight: bolder;
    text-transform: uppercase;
    position: relative;
    @include square(#ffed66);
  }
  .square--higher {
    @include square(#00cecb);
  }
  .square--lower {
    @include square(#ff5e5b);
  }
  .square__number {
    position: absolute;
  }
  .square--goal {
    background-image: linear-gradient(45deg, #ffffea 25%, transparent 25%),
      linear-gradient(-45deg, #ffffea 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ffffea 75%),
      linear-gradient(-45deg, transparent 75%, #ffffea 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    .square__number {
      top: 50%;
      left: 50%;
      font-size: 1.25em;
      transform: translate(-50%, -50%);
    }
  }
  .square__to {
    top: 0.5em;
    right: 1em;
  }
  .square__to:after {
    content: "\2191";
    position: absolute;
    font-size: 1.25em;
    bottom: 0;
  }
  .square--lower .square__to {
    color: darken(#ff5e5b, 40%);
    top: auto;
    bottom: 0.5em;
    right: 1em;
  }
  .square--lower .square__to:after {
    content: "\2193";
  }
</style>