<template lang="html">
    <div>
        <curveBars :option="opt"></curveBars>
    </div>
</template>

<script>
    import curveBars from 'components/monitor/curveBars'
    export default {
        data () {
            let me = this;
            return {
                opt: {
                    data: [
                        {
                            area: '银川',
                            count: 100
                        }, {
                            area: '石嘴山',
                            count: 50
                        }, {
                            area: '中卫',
                            count: 30
                        }, {
                            area: '比较长的名字名字',
                            count: 20
                        }
                    ],
                    barClick (item, index) {
                        console.log('外部', item)
                        console.log(index)
                    }
                }
            }
        },
        created () {
        },
        components: {
            curveBars
        },
        methods: {
        }
    }
</script>

<style lang="css">
</style>
