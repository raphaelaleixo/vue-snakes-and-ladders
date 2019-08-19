<template>
  <div class="dice"
    :style="{'transition-duration':defs.timing + 'ms'}"
    :class="'dice--face-'+faceValue">
    <div class="dice__face"
      v-for="face in 6"
      :key="face">
      <div class="dice__dot"
        v-for="dot in face"
        :key="dot"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      defs: Object,
      die: Number,
      turn: Boolean
    },
    data () {
      return {
        faceValue: this.die
      }
    },
    watch: {
      turn (newValue) {
        if (newValue === true) {
          let revolutions = this.defs.rotations;
          const spin = () => {
            revolutions--;
            if (revolutions > 0) {
              this.faceValue = Math.floor(Math.random() * 6) + 1
              setTimeout(spin, this.defs.timing);
            } else {
              setTimeout(() => {
                this.faceValue = this.die
              })
            }
          }
          spin()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dice {
    height: 3em;
    width: 3em;
    margin: 0 1em 0 0;
    position: relative;
    transform-style: preserve-3d;
    transition: all 0.2s linear;
    &.dice--face-1 {
      transform: rotateY(360deg) !important;
    }
    &.dice--face-2 {
      transform: rotateY(-90deg) !important;
    }
    &.dice--face-3 {
      transform: rotateY(180deg) !important;
    }
    &.dice--face-4 {
      transform: rotateY(90deg) !important;
    }
    &.dice--face-5 {
      transform: rotateX(-90deg) !important;
    }
    &.dice--face-6 {
      transform: rotateX(90deg) !important;
    }
  }
  .dice__face {
    position: absolute;
    width: 3em;
    height: 3em;
    padding: 0.5em;
    text-align: center;
    line-height: 3em;
    border-radius: 10px;
    border: 1px solid #e6cb00;
    background: radial-gradient(circle, #e6cb00 0%, darken(#e6cb00, 5%) 100%);
    &:nth-child(1) {
      .dice__dot {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      transform: rotateY(0deg) translateZ(1.5em);
    }
    &:nth-child(2) {
      .dice__dot:last-child {
        bottom: 0.5em;
        right: 0.5em;
      }
      transform: rotateY(90deg) translateZ(1.5em);
    }
    &:nth-child(3) {
      .dice__dot:nth-child(2) {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .dice__dot:last-child {
        bottom: 0.5em;
        right: 0.5em;
      }
      transform: rotateY(180deg) translateZ(1.5em);
    }
    &:nth-child(4) {
      .dice__dot:nth-child(2) {
        bottom: 0.5em;
      }
      .dice__dot:nth-child(3) {
        right: 0.5em;
      }
      .dice__dot:last-child {
        bottom: 0.5em;
        right: 0.5em;
      }
      transform: rotateY(-90deg) translateZ(1.5em);
    }
    &:nth-child(5) {
      .dice__dot:nth-child(2) {
        bottom: 0.5em;
      }
      .dice__dot:nth-child(3) {
        right: 0.5em;
      }
      .dice__dot:nth-child(4) {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .dice__dot:last-child {
        bottom: 0.5em;
        right: 0.5em;
      }
      transform: rotateX(90deg) translateZ(1.5em);
    }
    &:nth-child(6) {
      .dice__dot:nth-child(2) {
        bottom: 0.5em;
      }
      .dice__dot:nth-child(3) {
        right: 0.5em;
      }
      .dice__dot:nth-child(4) {
        top: 50%;
        right: 0.5em;
        transform: translateY(-50%);
      }
      .dice__dot:nth-child(5) {
        top: 50%;
        transform: translateY(-50%);
      }
      .dice__dot:last-child {
        bottom: 0.5em;
        right: 0.5em;
      }
      transform: rotateX(-90deg) translateZ(1.5em);
    }
  }
  .dice__dot {
    width: 0.55em;
    height: 0.55em;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    box-shadow: inset 0 -1px 0 0px darken(#e6cb00, 20%);
  }
</style>