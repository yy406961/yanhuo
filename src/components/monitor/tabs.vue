<template>
    <div :style="mainStyle">
        <div class="ga-tabs">
            <div class="ga-tabs__tabsTitle">
                <div class='ga-tabs__popHide' @click='closeTabs'> </div>
                <span :class="['ga-tabs__tabs', tabSwitch == 'line' ? 'bottomLine' : '']" @click="rightTabsLine()">变化趋势</span>
                <span :class="['ga-tabs__tabs', tabSwitch == 'table' ? 'bottomLine' : '']" @click="rightTabsTable()">人员列表</span>
            </div>
            <div class="ga-tabs__content" ref="content">
                <div v-show="lineShow">
                    <div class="ga-tabs__Title">{{ lineTitle }}</div>
                    <el-row :span='8' class='ga-tabs__linesWrap' v-for='(item, index) in TArray' :key='item'>
                        <span class='ga-tabs__lineTitle'>{{TArray[index]}}在线用户变化情况</span>
                        <linesTrend :option="lineOpt" :renderData="lineData[index]" :flag="index"></linesTrend>
                    </el-row>
                </div>
                <div v-show="!lineShow" id="findTab" style="padding: 0px">
                    <div class="ga-tabs__Title">{{ tableTitle }}</div>
                    <!--<template v-if="area === '新疆' && data.xjExportUrl">-->
                        <!--<span class="ga-tabs__buttons">-->
                            <!--<a :href="data.xjExportUrl" class="ga-tabs__button">新疆人员导出</a>-->
                        <!--</span>-->
                    <!--</template>-->
                    <!--<template v-else-if="area === '西藏' && data.xzExportUrl">-->
                        <!--<span class="ga-tabs__buttons">-->
                            <!--<a :href="data.xzExportUrl" class="ga-tabs__button">西藏人员导出</a>-->
                        <!--</span>-->
                    <!--</template>-->
                    <!--<template v-else-if="data.exportUrl">-->
                    <!--<template>-->
                    <span class="ga-tabs__buttons">
                        <a :href="exportUrl" class="ga-tabs__button">人员导出</a>
                    </span>
                    <!--</template>-->
                    <tableCom :option="tableOpt" :comSize="comSize" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange="handleSizePageChange"></tableCom>
                </div>
            </div>
            <span class="ga-tabs__leftTop"></span>
            <span class="ga-tabs__rightTop"></span>
            <span class="ga-tabs__leftBottom"></span>
            <span class="ga-tabs__rightBottom"></span>
            <span class="ga-tabs__left"></span>
            <span class="ga-tabs__right"></span>
            <span class="ga-tabs__top"></span>
            <span class="ga-tabs__bottom"></span>
        </div>
    </div>
</template>

<script>
    import linesTrend from 'components/monitor/linesTrend'
    import tableCom from 'components/Table'
    import { mapGetters } from 'vuex'
    export default {
        name: 'tabs',
        props: ['expUrl', 'tableData', 'tabType', 'renderData', 'lineTitle', 'tableTitle', 'area'],
        data () {
//            let me = this
            return {
                mainStyle: {
                    width: '100%',
                    height: '100%'
                },
                TArray: ['近1小时', '近24小时', '近7天'],
                tabSwitch: 'line',
                lineShow: true,
                exportUrl: '',
                tableOpt: {
                    column: [
                        { name: '序号', value: 'index', width: 60, align: 'center' },
                        { name: '手机号', value: 'msisdn', width: 120, align: 'center' },
                        { name: '所属地', value: 'name', width: 100, align: 'center' },
                        { name: '迁入时间', value: 'arrivetime', width: 150, align: 'center' },
                        { name: '停留时间', value: 'staytime', align: 'center' }
                    ],
                    pagination: true,
                    pageOpt: {
                        // total: 100,
                        currentPage: 1,
                        pageSizes: [10, 20, 30],
                        pageSize: 10
                    },
                    data: []
                },
                comSize: {
                    height: 380
                },
//                data: {},
                lineData: [],
                lineOpt: {
                    width: '100%',
                    props: {
                        gridBottom: 30,
                        gridTop: 15,
                        gridLeft: 80,
                        gridRight: 20
                    }
                }
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            })
        },
//        created () {
//            this.data = this.option
//            this.tableOpt = this.option.tableOpt
//            console.log(this.option)
//            this.tableOpt.data = this.option.tableOpt.data
//        },
        watch: {
            'expUrl' (val) {
//                console.log('导出地址')
//                console.log(val)
                this.exportUrl = val
            },
            'tableData' (val) {
                this.tableOpt.data = val
//                console.log('表格数据变化')
            },
//            'option' (newVal) {
//                console.log('表格数据变化');
//                this.data = this.option
//                this.tableOpt = this.option.tableOpt
//                if (newVal === '') {
//                    $('.ga-tabs__content').css('height', '101%')
//                } else {
//                    $('.ga-tabs__content').css('height', 'calc(100% - 28px)')
//                }
//            },
            'renderData' () {
//                console.log('线数据变化')
                this.lineData = this.renderData
            }
        },
        beforeMount () {
            this.setLinesHeight()
        },
        create () {
//            this.data = this.option
        },
        mounted () {
//            this.data = this.option
            if (this.title) {
                $('.ga-tabs__content').css('height', 'calc(100% - 28px)')
            } else {
                $('.ga-tabs__content').css('height', '101%')
            }
        },
        methods: {
            rightTabsLine () {
                this.tabSwitch = 'line'
                this.lineShow = true
                this.$emit('lineClick')
            },
            rightTabsTable () {
                this.tabSwitch = 'table'
                this.lineShow = false
                $('#findTab').css({
                    'padding-left': '0.8px'
                })
                setTimeout(() => {
                    $('#findTab').css({
                        'padding-left': '0px'
                    })
                })
                this.$emit('tableClick')
            },
            closeTabs () {
                this.$emit('closeTabs', false)
            },
            peopleExport () {
                this.$emit('peopleExport')
            },
            handleCurrentPageChange (val) {
                this.$emit('handleCurrentPageChange', val)
            },
            handleSizePageChange (val) {
                this.$emit('handleSizePageChange', val)
            },
            // 设置折线图的高度
            setLinesHeight () {
                this.lineOpt.height = (this.vsHeight - 31 - 47) / 3 - 10
            }
        },
        components: {
            linesTrend,
            tableCom
        }
    }
</script>

<style scoped>
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    .bottomLine::after {
        content: '';
        width: 100px;
        height: 2px;
        display: block;
        background: #4aa6dc;
        position: absolute;
        top: 28px;
    }
    @component-namespace ga {
        @b tabs {
            position: relative;
            color: #ffffff;
            font-size: 12px;
            width: 100%;
            height: 100%;
            border: 1px solid transparent;
            padding: 0 6px 10px 6px;
            @e content {
                overflow: auto;
                /*padding: 8px 5px;*/
                width: 100%;
                /*height: calc(100% - 35px);*/
                background: linear-gradient(-45deg, transparent 9px, rgba(0, 0, 0, 0.7) 0);
            }
            @e tabsTitle {
                position: relative;
                /*overflow: hidden;*/
                white-space: nowrap;
                font-size: 13px;
                color: #fff;
                height: 28px;
                background: linear-gradient(135deg, transparent 9px, #0B245F 0);
            }
            @e Title {
                margin: 10px 0;
                /* width: 50%; */
            }
            @e buttons {
                display: block;
                position: absolute;
                top: 38px;
                right: 3%;
                color: #fff;
                font-size: 13px;
            }
            @e popHide {
                /*float: right;*/
                width: 10px;
                height: 10px;
                cursor: pointer;
                position: absolute;
                top: 10px;
                right: 20px;
                background: url("~assets/images/common/close.png") no-repeat 0 center;
            }
            @e tabs {
                display: inline-block;
                width: 100px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                cursor: pointer;
            }
            @e lineTitle {
                font-size: 12px;
                line-height: 16px;
                margin-left: 10px;
                &:before {
                    content: "";
                    width: 5px;
                    height: 16px;
                    background: #4aa6dc;
                    position: absolute;
                    margin-left: -10px;
                }
            }
            @e leftTop {
                position: absolute;
                left: -1px;
                top: -2px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat 0 0;
            }
            @e rightTop {
                position: absolute;
                right: -1px;
                top: -2px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat -25px 0;
            }
            @e leftBottom {
                position: absolute;
                left: -1px;
                bottom: -1px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat 0 -25px;
            }
            @e rightBottom {
                position: absolute;
                right: -1px;
                bottom: -1px;
                width: 22px;
                height: 22px;
                background: url('~@/assets/images/monitor/frameComp.png') no-repeat -25px -25px;
            }
            @e left {
                position: absolute;
                left: -1px;
                bottom: 20px;
                width: 1px;
                height: calc(100% - 40px);
                background: #4f8ee5;
            }
            @e right {
                position: absolute;
                right: -1px;
                bottom: 20px;
                width: 1px;
                height: calc(100% - 40px);
                background: #4f8ee5;
            }
            @e top {
                position: absolute;
                left: 20px;
                top: -1px;
                width: calc(100% - 40px);
                height: 1px;
                background: #4f8ee5;
            }
            @e bottom {
                position: absolute;
                left: 20px;
                bottom: -1px;
                width: calc(100% - 40px);
                height: 1px;
                background: #4f8ee5;
            }
        }
    }
</style>
