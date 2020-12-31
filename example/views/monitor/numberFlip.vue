<template lang="html">
    <div>
        <el-row  type="flex">
            <el-col :span="6" style="textAlign:right;"><el-button type="primary" @click="addNumber()">动态+到</el-button></el-col>
            <el-col :span="6"><el-input v-model="input"></el-input></el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
            <numberFlip :options="opt" :renderData="ajaxData"></numberFlip>
        </el-row>
    </div>

</template>
<script>
import numberFlip from 'components/monitor/numberFlip'
export default {
    name: 'numberDemo',
    data () {
        return {
            opt: {
                height: 100
            },
            input: 16857222,
            ajaxData: []
        }
    },
    mounted () {
        setTimeout(() => {
            this.ajaxData = [{ value: 0 }]
        }, 50)
    },
    methods: {
        addNumber () {
            this.ajaxData = [{ value: this.input }]
        }
    },
    components: {
        numberFlip
    }
}
</script>

<style scoped>
.box{
    display: flex;
    justify-content:center;

    & .item{

    }
}
</style>
