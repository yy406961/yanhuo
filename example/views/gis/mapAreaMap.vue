<template lang="html">
      <div :style="mapHeight" ref="mapArea">
      </div>
</template>

<script>
export default {
    name: 'mapAreaDemo',
    data() {
        return {
            mapData: {}
        }
    },
    computed: {
        mapHeight() {
            return {
                width: '1000px',
                height: '600px'
            }
        }
    },
    methods: {
        changeMap(e) {
            console.log(e)
        }
    },
    components: {},
    mounted() {
        // axios.get('/tarOffAlaDetail').then(resp => {
        //     console.log(resp)
        // })
        this.EC = echarts.init(this.$refs.mapArea)
        this.EC.setOption({
            title: {
                text: '青海政区图'
            },
            geo: {
                map: 'qinghai',
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#ddb926',
                            fontSize: 10
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#ddb926',
                            fontSize: 10
                        }
                    }
                }
            },
            series: [
                {
                    name: '青海',
                    type: 'map',
                    data: [{ name: '西宁市', value: 100 }]
                }
            ]
        })
    }
}
</script>

<style lang="css">
</style>
