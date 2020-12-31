<template lang="html">
      <div :style="mapHeight">
            <mapAreaComp  :style="mapHeight" ref="gisMap" :option="mapData" @mapCoordinate="changeMap"></mapAreaComp>
      </div>
</template>

<script>
import mapAreaComp from 'views/system/taskCreate/config/mapAreaUtil'
export default {
    name: 'mapAreaDemo',
    data() {
        return {
            mapData: {
                areaBorder: [],
                cellInfo: []
            }
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
    components: {
        mapAreaComp
    },
    mounted() {
        // axios.get('/tarOffAlaDetail').then(resp => {
        //     console.log(resp)
        // })
    }
}
</script>

<style lang="css">
</style>
