<template>
    <div id="app">
        <layout></layout>
    </div>
</template>

<script>
    import layout from './views/layout/index'
    export default{
        name: 'APP',
        components: {
            layout
        }
    }
</script>
<style>
    @reset-global pc;
    .example-bg{
        background: url('../src/assets/images/mainbg.png');
        background-repeat: repeat;
        background-size: cover;
        background-attachment: fixed;
    }
</style>
