<template>
    <div class="settings__wrapper">
        <label class="settings__label"
            :for="normalizedName">{{label}}:</label>
        <input type="range"
            :id="normalizedName"
            ref="inputRange"
            :min="min"
            :max="max"
            :value="value"
            @input="emitChange" />
        <output>{{output}}</output>
    </div>
</template>

<script>
    export default {
        props: {
            min: Number,
            max: Number,
            value:Number,
            label: String,
            outputArray: Array
        },
        computed: {
            normalizedName() {
                return 'input-'+this.label.toLowerCase().replace(/\s/g,'')
            },
            output() {
                if (this.outputArray) {
                    return this.outputArray[this.value - this.min]
                }
                else {
                    return this.value;
                }
            }
        },
        methods: {
            emitChange() {
                this.$emit('input', parseInt(this.$refs.inputRange.value));
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>