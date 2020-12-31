<template>
    <audio ref="warnSound" :src=soundPath></audio>
</template>
<script>
    export default {
        data () {
            return {
                soundPath: require('../../assets/images/warnSound.mp3')
            }
        },
        methods: {
            play () {
                this.$refs.warnSound.play()
            }
        }
    }
</script>
