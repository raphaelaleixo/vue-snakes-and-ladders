<template>
  <div class="dice__wrapper">
    <div class="dice" :class="'dice--face-'+game.dice.dice1">
      <div class="dice__face" v-for="face in 6" :key="face">{{face}}</div>
    </div>
    <div class="dice" :class="'dice--face-'+game.dice.dice2">
      <div class="dice__face" v-for="face in 6" :key="face">{{face}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: Object
  }
};
</script>

<style lang="scss" scoped>
.dice__wrapper {
  width: 100%;
  height: 3em;
  display:flex;
  justify-content:  center;
  perspective: -1000px;
}
.dice {
  height: 3em;
  width: 3em;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.15s;
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
  text-align: center;
  line-height: 3em;
  border-radius: 5px;
  background: #fff;
  border:2px solid #000;
  &:nth-child(1) {
    transform: rotateY(0deg) translateZ(1.5em);
  }
  &:nth-child(2) {
    transform: rotateY(90deg) translateZ(1.5em);
  }
  &:nth-child(3) {
    transform: rotateY(180deg) translateZ(1.5em);
  }
  &:nth-child(4) {
    transform: rotateY(-90deg) translateZ(1.5em);
  }
  &:nth-child(5) {
    transform: rotateX(90deg) translateZ(1.5em);
  }
  &:nth-child(6) {
    transform: rotateX(-90deg) translateZ(1.5em);
  }
}
</style>