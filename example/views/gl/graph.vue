<template lang="html">
      <div style="{width:100%;height:100%}" >
            <el-button @click="selectChange(15000000010)">点击高亮</el-button>
            <el-button @click="unSelectChange()">取消高亮</el-button>
            <el-button @click="randomSize">随机尺寸</el-button>
            <graphComp ref="g" :options="opts" @graphClick="clickHandler" :size="sizeObj"></graphComp>
      </div>
</template>

<script>
import graphComp from 'components/Chart/graphGl'
import axios from 'axios'
// import Mock from 'mockjs'
export default {
    name: 'graphDemo',
    data() {
        return {
            opts: {
                value: '15000000008',
                // 重点人信息列表 (号码 , 通联人数, 类型)
                phoneData: [],
                // 重点人关系列表
                relData: [],
                selectNum: []
            },
            sizeObj: {
                width: 1000,
                height: 500
            }
        }
    },
    mounted() {
        // const relData = Mock.mock({
        //     'array|2000': [
        //         {
        //             'name|13800000000-13800005000': 100,
        //             'targetName|200': [
        //                 '138***1211',
        //                 '151****1345',
        //                 '156****3123',
        //                 '138****1111',
        //                 '139***1211',
        //                 '153****3212',
        //                 '152****1223',
        //                 '153****1111'
        //             ],
        //             'count|1-10': 10
        //         }
        //     ]
        // }).array

        // phoneData type表示内部，外部，网间
        // const phoneData = Mock.mock({
        //     'array|2000': [
        //         {
        //             'name|13800000000-13800005000': 100,
        //             'count|1-10': 10,
        //             type: 1
        //         }
        //     ]
        // }).array
        // const relData = Mock.mock({
        //     'array|100': [
        //         {
        //             'name|18100000001-18100000100': 1138,
        //             'targetName|1': ['138****1111', '138****1112', '138****1113', '138****1114'],
        //             'count|1-10': 10
        //         }
        //     ]
        // }).array
        // // phoneData type表示内部，外部，网间
        // let phoneData = Mock.mock({
        //     'array|4': [
        //         {
        //             'name|1': ['138****1111', '138****1112', '138****1113', '138****1114'],
        //             'count|1-10': 10,
        //             type: 1
        //         }
        //     ]
        // }).array

        // 外部
        // const outerPhone = Mock.mock({
        //     'array|100': [
        //         {
        //             'name|18100000001-18100000100': 10,
        //             'count|1-10': 10,
        //             type: 2
        //         }
        //     ]
        // }).array

        // let cPhoneData = phoneData.concat(outerPhone)
        //
        // relData.forEach(item => {
        //     item.name = String(item.name)
        //     item.targetName = String(item.targetName)
        // })
        // cPhoneData.forEach(item => {
        //     item.name = String(item.name)
        // })
        this.opts = {
            type: 2,
            relData: [],
            phoneData: []
        }
        // setTimeout(() => {
        //     this.opts.relData = relData
        //     this.opts.phoneData = phoneData
        // }, 1000)
        //
        // axios.get('/example/static/mock/phoneData.json').then(resp1 => {
        //     axios.get('/example/static/mock/relData.json').then(resp2 => {
        //         this.opts.phoneData = resp1.data.data
        //         this.opts.relData = resp2.data.data
        //     })
        // })
        //
        axios.get('/example/static/5000_tonglian.json').then(resp1 => {
            axios.get('/example/static/5000_inner.json').then(resp2 => {
                let phoneData = resp2.data.rows
                let { rows } = resp1.data
                if (rows) {
                    let line = rows.map(item => {
                        return {
                            name: item.innerMsisdn + '',
                            targetName: item.relateNum + '',
                            count: item.amount
                        }
                    })
                    let phone = phoneData.map(item => {
                        return {
                            cname: item.cname,
                            name: item.relateNum,
                            count: item.connPersonCount,
                            type: item.type
                        }
                    })
                    this.opts.relData = line
                    this.opts.phoneData = phone
                }
            })
        })
        this.resizeFn()
        $(window).resize(() => {
            this.resizeFn()
        })
    },
    methods: {
        clickHandler(arg) {
            console.log(arg)
        },
        resizeFn() {
            let width = $(window).width()
            let height = $(window).height()
            this.width = width
            this.height = height
        },
        selectChange(val) {
            this.$refs.g.setNodeFocus(val)
        },
        randomSize() {
            // let w = _.random(900, 1200);
            let h = _.random(500, 700)
            this.sizeObj.width = '100%'
            this.sizeObj.height = h + 'px'
        },
        unSelectChange() {
            this.$refs.g.unSetNodeFocus()
        }
    },
    computed: {
        styleObj() {
            return {
                width: this.width + 'px',
                height: this.height + 'px'
            }
        }
    },
    components: {
        graphComp
    }
}
</script>

<style lang="css">
</style>
