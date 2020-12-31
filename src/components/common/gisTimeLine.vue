<template lang="html">
    <div>
        <el-row>
            <el-row>
                <el-button type="primary">实时</el-button>
                <el-button type="primary">回放/暂停</el-button>
            </el-row>
            <el-col :span="1">
                <el-button type="primary" @click="prev">-</el-button>
            </el-col>
            <el-col :span="10">
                <el-slider v-model="value" 
                            :step="1"
                            show-stops
                            :max="stepMax"
                            :format-tooltip="formatTooltip" disabled></el-slider>
            </el-col>
            <el-col :span="1">
                <el-button type="primary" @click="next">+</el-button>
            </el-col>
        </el-row>
        <el-row>
            {{ value }}
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'gisTimeLine',
    props: ['points'],
    data () {
        return {
            value: 0
        }
    },
    computed: {
        stepMax () {
            return this.points.length - 1;
        }
    },
    methods: {
        formatTooltip (val) {
            return this.points[val];
        },
        prev () {
            this.value = this.value >= 0 ? this.value - 1 : this.value;
            console.log(this.value)
        },
        next () {
            this.value = this.value < this.points.length ? this.value + 1 : this.value;
            console.log(this.value)
        }
    },
    mounted () {
        console.log(this.points)
    }
}
</script>

<style lang="postcss" scoped>
</style>
