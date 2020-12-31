<template lang="html">
    <div>
        <stackedBar :option="opt"></stackedBar>
    </div>
</template>

<script>
    import stackedBar from 'components/monitor/stackedBar'
    export default {
        data () {
            let me = this;
            return {
                opt: {
                    data: [
                        {
                            area: '银川',
                            sjcount: 30000,
                            szcount: 70000,
                            count: 100000
                        }, {
                            area: '石嘴山',
                            sjcount: 20000,
                            szcount: 40000,
                            count: 60000
                        }, {
                            area: '中卫',
                            sjcount: 20000,
                            szcount: 10000,
                            count: 30000
                        }, {
                            area: '比较长的名字名字',
                            sjcount: 4000,
                            szcount: 5000,
                            count: 9000
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
            stackedBar
        },
        methods: {
        }
    }
</script>

<style lang="css">
</style>
