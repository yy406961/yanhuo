<template>
    <div id="app">
        <layout></layout>
    </div>
</template>
<script>
import layout from '@/views/layout/layout'
export default {
    name: 'app',
    components: {
        layout
    }
}
</script>

<style>
#app,
#app > div {
    width: 100%;
    height: 100%;
}
</style>
