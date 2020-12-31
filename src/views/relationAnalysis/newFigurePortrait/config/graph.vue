<template>
    <div class="graphBox">
        <div ref="main" :style="mainStyle" class="main-box"></div>
        <div class="introduce" >
            <div v-for="(item, index) in categoryName" class="legend">
                <span :style="{background:item.color}"></span>
                <p style="font-size: 12px">{{item.name}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import sysDialog from 'components/common/dialog'
    import { phoneNumChange } from 'utils/index'
    import { mapGetters } from 'vuex'
    const DATA_TYPE = {
        IN: 1,
        OUT: 2,
        MUTUAL: 3
    }
    // 高中低
    const COLORS = {
        // 红
        H: '#ff3e0a',
        HB: 'rgba(255, 62, 10, 0.5)',
        // 黄
        M: '#ffa60a',
        MB: 'rgba(255, 166, 10, 0.5)',
        // 蓝
        L: '#0b9df0',
        LB: 'rgba(11, 157, 240, 0.5)',
        Y: '#ff0',
        YB: 'rgba(255, 255, 255, 0.5)'
    }
    export default {
        data () {
            return {
                // 内联limit阈值
                innerThreshold: {
                    innerLowEnd: 1,
                    innerMiddleEnd: 3,
                    innerHighEnd: 999
                },
                innerThresholdOld: {
                    innerLowEnd: 1,
                    innerMiddleEnd: 3,
                    innerHighEnd: 999
                },
                // 内联limit
                // innerLimit: [
                //     { start: 0, end: 1, name: '低', color: COLORS.L, colorB: COLORS.LB },
                //     { start: 2, end: 3, name: '中', color: COLORS.M, colorB: COLORS.MB },
                //     { start: 4, end: 999, name: '高', color: COLORS.H, colorB: COLORS.HB }
                // ],
                // 外联时候的VIEW 图例集合
                outerCategoryName: [
                    { name: '非重点人', color: COLORS.L },
                    { name: '重点人', color: COLORS.H },
                    { name: '目标人', color: COLORS.Y }
                ],
                // 界面图例集合
                categoryName: [],
                // 外联limit 按value取之前的数据
                outerLimit: [
                    { value: 2, name: '2人及以上', size: '6' },
                    { value: 3, name: '3人及以上', size: '6' },
                    { value: 4, name: '4人及以上', size: '6' },
                    { value: 5, name: '5人及以上', size: '6' },
                    { value: 6, name: '6人及以上', size: '8' },
                    { value: 7, name: '7人及以上', size: '8' },
                    { value: 8, name: '8人及以上', size: '10', isEnd: true }
                ],
                // 存外联节点的集合 先预定义
                outerNodes2: [],
                outerNodes3: [],
                outerNodes4: [],
                outerNodes5: [],
                outerNodes6: [],
                outerNodes7: [],
                outerNodes8: [],
                value: 2,
                EC: {},
                ecNode: [],
                ecLink: [],
                option: [],
                category: [],
                relData: [],
                phoneData: [],
                categories: [],
                insidePersonnel: [],
                nameArr: [],
                mainStyle: {
                    width: '100%',
                    height: 500 + 'px'
                },
                dialogVisibleThreshold: false
            }
        },
        props: ['options', 'size'],
        created () {
            this.mainStyle.width = this.size.width;
            this.mainStyle.height = this.size.height;
        },
        mounted () {
            this.createEC()
            this.addEvent()
        },
        watch: {
            options: {
                deep: true,
                handler (val) {
                    const me = this;
                    if (val.phoneData instanceof Array) {
                        this.clearNodes()
                        this.relData = val.relData
                        this.phoneData = val.phoneData
                        this.$nextTick(() => {
                            me.initAll()
                        })
                    }
                }
            },
            size: {
                deep: true,
                handler (newval) {
                    if (newval.width && newval.height) {
                        this.mainStyle.width = newval.width;
                        this.mainStyle.height = newval.height;
                        this.$nextTick(() => {
                            this.resize()
                        })
                    }
                }
            }
        },
        computed: {
            innerLimit () {
                return [
                    {
                        start: 0,
                        end: this.innerThreshold.innerLowEnd,
                        name: '低',
                        color: COLORS.L,
                        colorB: COLORS.LB
                    }, {
                        start: this.innerThreshold.innerLowEnd - 0 + 1,
                        end: this.innerThreshold.innerMiddleEnd,
                        name: '中',
                        color: COLORS.M,
                        colorB: COLORS.MB
                    }, {
                        start: this.innerThreshold.innerMiddleEnd - 0 + 1,
                        end: this.innerThreshold.innerHighEnd,
                        name: '高',
                        color: COLORS.H,
                        colorB: COLORS.HB
                    }
                ]
            },
            outerTypeflag () {
                return (this.options.type === DATA_TYPE.OUT && this.options.phoneData.length !== 0)
            },
            ...mapGetters({
                'isPhoneJM': 'global/isPhoneJM'
            })
        },
        components: {
            sysDialog
        },
        methods: {
            dialogChangeThreshold (val) {
                this.dialogVisibleThreshold = val
                if (!val) {
                    this.innerThreshold = this.innerThresholdOld
                }
            },
            dialogOpendCallbackThreshold () {
                this.innerThresholdOld = _.cloneDeep(this.innerThreshold)
            },
            okFnThreshold () {
                if (isNaN(this.innerThreshold.innerLowEnd) ||
                    isNaN(this.innerThreshold.innerMiddleEnd) ||
                    isNaN(this.innerThreshold.innerHighEnd)) {
                    this.$message.error('请输入纯数字')
                } else if (((Number(this.innerThreshold.innerLowEnd) + 1) >= this.innerThreshold.innerMiddleEnd) ||
                    ((Number(this.innerThreshold.innerMiddleEnd) + 1) >= this.innerThreshold.innerHighEnd) ||
                    this.innerThreshold.innerLowEnd <= 0
                    ) {
                    this.$message.error('阈值范围输入有误')
                } else {
                    this.innerThresholdOld = _.cloneDeep(this.innerThreshold)
                    this.dialogVisibleThreshold = false
                    this.clearNodes()
                    this.$nextTick(() => {
                        this.initAll()
                    })
                }
            },
            thresholdConfig () {
                this.dialogChangeThreshold(true)
            },
            initAll () {
                this.initPersonnelNode()
                this.initViewCategory()
                this.initData()
                this.setOption()
                this.setEC()
            },
            /**
             * [initViewCategory 处理界面图例数据]
             * @return
             */
            initViewCategory () {
                if (this.options.type === DATA_TYPE.IN) {
                    this.categoryName = this.innerLimit.map(it => {
                        return {
                            name: it.name,
                            color: it.color
                        }
                    })
                } else {
                    this.categoryName = this.outerCategoryName.map(it => {
                        return {
                            name: it.name,
                            color: it.color
                        }
                    })
                    if (this.options.type === DATA_TYPE.MUTUAL) {
                        this.categoryName[1].name = '组间'
                    }
                }
            },

            /**
             * [innerCategoryLimit 内联分类处理 根据内联节点的通联人数]
             * @param  {Number} count 通联人数
             * @return {Object}  分类对象
             */
            innerCategoryLimit (count = 0) {
                let categoryObj = {};
                this.innerLimit.forEach((it) => {
                    // 计算count在
                    if (it.start <= count && it.end >= count) {
                        categoryObj.name = it.name
                        categoryObj.color = it.color
                        categoryObj.colorB = it.colorB
                    }
                })
                return categoryObj
            },
            // 人物画像关系人分析点颜色处理
            colorCategoryLimit (flag = 0) {
                let categoryObj = {};
                if (flag === 0) {
                    categoryObj.name = '非重点人'
                    categoryObj.color = COLORS.L
                    categoryObj.colorB = COLORS.LB
                } else {
                    categoryObj.name = '重点人'
                    categoryObj.color = COLORS.H
                    categoryObj.colorB = COLORS.HB
                }
                return categoryObj
            },
            /**
             * [outerCategoryLimit 外部分类处理  在外部重点人的通联人数]
             * @param  {Number} [count=0]  通联人数
             * @return {Object}  分类对象
             */
            outerCategoryLimit (count = 0) {
                let categoryObj = {};
                this.outerLimit.forEach((it) => {
                    if (it.value === count || (it.value <= count && it.isEnd)) {
                        categoryObj.name = it.name
                        categoryObj.size = it.size
                        categoryObj.index = it.value
                    }
                })
                categoryObj.color = COLORS.L
                return categoryObj
            },
            // 初始化内部节点
            initPersonnelNode () {
                const me = this;
                // 初始化图例
                this.categories = this.innerLimit.map(it => {
                    return {
                        name: it.name
                    }
                })
                const repeatData = []
                this.phoneData.forEach(item => {
                    if (!this.nameArr.includes(item.name)) {
                        this.nameArr.push(item.name)
                        repeatData.push(item)
                    }
                })
                this.phoneData = repeatData
                this.phoneData.forEach((item, index) => {
                    const node = {
                        name: item.name,
                        value: item.count,
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        Original: item
                    }
                    if (item.type === DATA_TYPE.IN) {
                        // 在通联的组件基础上更改功能 --- 此只只用于人物画像的关系人
                        // categoryObj绑定每个点的颜色属性
                        const categoryObj = me.colorCategoryLimit(item.flag)
                        const _colorTarnum = 'yellow'
                        // 目标人没有flag属性
                        const _color = item.flag !== undefined ? categoryObj.color : COLORS.H
                        const _colorB = item.flag !== undefined ? categoryObj.colorB : COLORS.HB
                        node.category = categoryObj.name
                        node.symbolSize = 10
                        node.itemStyle = {
                            // 设置点的样式
                            normal: {
                                color: +index === this.phoneData.length - 1 ? _colorTarnum : _color,
                                borderColor: +index === this.phoneData.length - 1 ? _colorTarnum : _colorB,
                                borderWidth: 8
                            }
                        }
                        if (this.insidePersonnel instanceof Array) this.insidePersonnel.push(node)
                    } else if (item.type === DATA_TYPE.OUT || item.type === DATA_TYPE.MUTUAL) {
                        const categoryObj = me.outerCategoryLimit(item.count)
                        node.symbolSize = categoryObj.size
                        node.category = categoryObj.name
                        node.itemStyle = {
                            normal: {
                                color: categoryObj.color,
                                borderColor: COLORS.LB,
                                borderWidth: 5
                            }
                        }
                        if (this[`outerNodes${categoryObj.index}`] instanceof Array) this[`outerNodes${categoryObj.index}`].push(node)
                    }
                })
            },
            initData () {
                if (this.options.type === DATA_TYPE.IN) {
                    this.ecNode = this.insidePersonnel
                } else {
                    this.ecNode = this.insidePersonnel.concat(
                        this.outerNodes2,
                        this.outerNodes3,
                        this.outerNodes4,
                        this.outerNodes5,
                        this.outerNodes6,
                        this.outerNodes7,
                        this.outerNodes8
                    )
                }
                this.ecLink = this.relData.map(item => {
                    return {
                        source: item.name,
                        target: item.targetName,
                        callAmount: item.callAmount,
                        count: item.count,
                        msgAmount: item.msgAmount
                    }
                })
            },
            setOption () {
                const me = this
                this.option = {
                    tooltip: {
                        show: true,
                        textStyle: {
                            fontSize: 12
                        },
                        backgroundColor: 'rgba(16,42,74,0.90)',
                        borderColor: 'rgba(60,164,255,1)',
                        formatter: function (res) {
                            let { count, callAmount, msgAmount, Original } = res.data
                            let content = '';
                            if (res.dataType === 'edge') {
                                content = '通联次数：' + count + '<br/>通话次数：' + callAmount + '<br/>短信次数：' + msgAmount
                                return content
                            } else {
                                // 非重点人/重点人的提示框内容不同
                                let { userName, flag } = Original
                                let phoneNum;
                                if (me.isPhoneJM) {
                                    phoneNum = phoneNumChange(res.data.Original.name)
                                } else {
                                    phoneNum = res.data.Original.name;
                                }
                                if (flag === 0) {
                                    content = `${phoneNum}<br/>`;
                                } else {
                                    let name = userName ? userName + '，' : ''
                                    content = `${name}${phoneNum}<br/>`;
                                    // content += `短信：${res.data.Original.msg}`
                                }
                                return content
                            }
                        }
                    },
                    series: [{
                        name: 'graph',
                        type: 'graph',
                        layout: 'force',
                        nodes: me.ecNode,
                        links: me.ecLink,
                        categories: me.categories,
                        label: {
                            normal: {
                                position: 'right',
                                formatter: function (res) {
                                    return phoneNumChange(res.name)
                                }
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#fff',
                                width: 2,
                                curveness: 0
                            }
                        },
                        force: {
                            repulsion: 50,
                            gravity: 0.2,
                            edgeLength: 50
                        },
                        symbolSize: 10,
                        roam: true,
                        draggable: true
                    }]
                }
            },
            createEC () {
                this.EC = window.echarts.init(this.$refs.main);
            },
            addEvent () {
                let me = this
                this.EC.getZr().on('click', function (e) {
                    if (!e.target) {
                        me.unSetNodeFocus()
                    }
                });
                this.EC.on('click', (params) => {
                    this.$emit('graphClick', params.data.Original)
                });
            },
            setEC () {
                this.EC.setOption(this.option)
            },
            resize () {
                this.EC.resize()
            },
            // 下拉筛选
            selectChange (val) {
                // 取分类value
                this.$emit('contanctCount', val)
                const limitArr = this.outerLimit.map(it => {
                    return it.value
                })
                const wantArr = _.drop(limitArr, val - 2);
                // console.log(wantArr)
                // 过滤集合
                // let _Arr = limitArr.splice(val - 1, limitArr.length)
                // if (_Arr.length === 0) _Arr.push(8)
                // 取节点
                const handlerNodes = wantArr.reduce((item, i) => {
                    return item.concat(this[`outerNodes${i}`])
                }, [])
                this.ecNode = this.insidePersonnel.concat(handlerNodes)
                this.option.series[0].nodes = this.ecNode
                this.setEC()
            },

            /**
             * [getSeriesIndexByPhone 根据number获取index]
             * @return {[type]} [description]
             */
            getSeriesIndexByPhone (number) {
                return this.EC._model.getSeries()[0].getData()._nameList.findIndex(it => { return it === String(number) })
            },
            // 是否在计算布局
            isLayouting () {
                return this.EC._chartsViews[0]._layouting
            },
            // 设置节点高亮
            setNodeFocus (number) {
//                if (this.isLayouting()) return
                const index = this.getSeriesIndexByPhone(number);
                if (index >= 0) {
                    this.EC.dispatchAction({
                        type: 'focusNodeAdjacency',
                        // 使用 seriesId 或 seriesIndex 或 seriesName 来定位 series.
                        seriesIndex: 0,
                        // 使用 dataIndex 来定位节点。
                        dataIndex: index
                    })
                }
            },
            // 取消节点高亮
            unSetNodeFocus () {
                this.EC.dispatchAction({
                    type: 'unfocusNodeAdjacency',
                    seriesIndex: 0,
                    dataIndex: 0
                })
            },
            // 清空
            clearNodes () {
                this.insidePersonnel = [];
                this.value = 2;
                this.nameArr = [];
                for (let i = 2; i <= 8; i++) {
                    this[`outerNodes${i}`] = []
                }
            }
        }
    }
</script>

<style scoped>
.legend{
    float: left;
}
.innerStart {
    float:left;
    min-width: 40px;
    text-align: center;
    padding: 0 10px;
}
.graphBox{
    position: relative;
}
.main-box{
    height : 500px;
}
.introduce{
    position: absolute;
    top: 10px;
    left: 5%;
}
.introduce div{
    padding: 5px;
    overflow: hidden;
}
.introduce span{
    float: left;
    width: 30px;
    height: 15px;
    border-radius: 3px;
}
.introduce p{
    margin-left: 5px;
    float: left;
    height: 15px;
    line-height: 15px;
    color: #ffffff;
}
.legend{
    float: left;
}
.screen{
    position: absolute;
    left: 240px;
    top: 7px;
}
.screenText{
    color: #ffffff;
    float: left;
    height: 36px;
    line-height: 28px;
    font-size: 12px;
}
.select{
    float: left;
}
</style>
