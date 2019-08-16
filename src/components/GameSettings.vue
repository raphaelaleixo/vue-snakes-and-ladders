<template>
    <form @submit.prevent="createNewGame"
        class="settings">
        <game-settings-input :min="2"
            :max="4"
            label="Number of players"
            v-model="newgame.numberOfPlayers"/>
        <game-settings-input :min="6"
            :max="10"
            :outputArray="boardSizes"
            label="Board size"
            v-model="newgame.base"/>
        <button type="submit">Play now</button>
    </form>
</template>

<script>
    import { mapActions } from 'vuex';
    import { mapState } from 'vuex';
    import GameSettingsInput from '@/components/GameSettingsInput'
    export default {     
        data () {
            return {
                newgame: {
                    numberOfPlayers: 2,
                    base: 8
                },
                boardSizes: ['Very small','Small','Medium','Large','Very large']
            }
        },
        components : {
            GameSettingsInput
        },
        computed: {
        ...mapState(['game'])
        },
        methods: {
        ...mapActions(['addGame']),
        async createNewGame () {
            await this.addGame(this.newgame);
            this.$router.push('/game/' + this.game.gameId);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>