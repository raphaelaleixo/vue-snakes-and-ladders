<template>
    <header class="header">
        <game-header-logo/>
        <nav class="header__nav nav">
            <ul class="nav__list">
                <li class="nav__item"><a class="nav__link" href="#">Tutorial</a></li>
                <li class="nav__item"><a class="nav__link" href="https://github.com/raphaelaleixo/vue-snakes-and-ladders">Github</a></li>
            </ul>
        </nav>
    </header>
</template>

<script>
    import GameHeaderLogo from '@/components/GameHeaderLogo'
    export default {
        components: {
            GameHeaderLogo
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        grid-area: header;
        display: flex;
        justify-content: space-between;
        align-items:center;
    }
    .nav__list {
        list-style-type: none;
        display: flex;
    }
    .nav__item {
        margin:0 0 0 1em;
    }
</style>