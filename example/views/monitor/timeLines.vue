<template lang="html">
    <div>
        <el-row  type="flex">
                <el-col row="6">
                    <el-button type="text" @click="pauseHandler">暂停</el-button>
                    <el-button type="text" @click="clearHandler">清空</el-button>
                    <el-button type="text" @click="startHandler">开始</el-button>
                </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
            <Timeline :options="opt" @change="changeTimeline" ref="time"></Timeline>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
            <!-- <Timeline :options="opt2" @change="changeTimeline" ref="time2"></Timeline> -->
            <p>{{start}}----{{end}}</p>
        </el-row>
    </div>
</template>

<script>
import Timeline from 'components/monitor/timeLines'
export default {
    name: 'timeline',
    data () {
        return {
            start: '',
            end: '',
            opt: {
                width: 1000,
                type: 'halfhour'
            },
            opt2: {
                width: 1200,
                type: 'five'
            }
        }
    },
    methods: {
        reszieBox () {
        },
        pauseHandler () {
            this.$refs.time.pause()
        },
        clearHandler () {
            this.$refs.time.clear()
        },
        startHandler () {
            this.$refs.time.start()
        },
        changeTimeline (val) {
            console.log(val)
            this.start = val.startTime
            this.end = val.endTime
        }
    },
    components: {
        Timeline
    }
}
</script>

<style scoped>
h1 {
    color:#fff
}
</style>
