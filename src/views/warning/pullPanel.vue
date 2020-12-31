<template>
    <div :class= "['ga-warningPullPanel__container',containerClassObj]" :style = "boxstyle">
        <div class="ga-warningPullPanel__tableTitle">
            <span class="overDots">{{opt.title1}}</span>
            <a :href="exportUrls" v-show="listDis" class="listOut">导出人员列表</a>
            <span v-show="warmDis" class="listOut" @click="showDialog()">预警导出</span>
            <span :class="{
                        'leftTitle': disposeCan === false,
                        'leftTitle2': disposeCan === true
                    }" v-show="leftTitle" @click="disposeAllData">批量处置</span>
            <div :class="['ga-warningPullPanel__tableArrow', arrowObj,
            { 'ga-warningPullPanel__tableArrow--open':opt.isOpen}]" @click="toggleOpen">
            <i class="el-icon-arrow-down"></i></div>
        </div>
        <div class="firstTable">
            <div v-if = "hasSubTitle()">
                <el-tooltip :content="opt.subtitle" placement="top">
                    <div class="ga-warningPullPanel__subTitle">
                        <span class="overDots">{{opt.subtitle}}</span>
                    </div>
                </el-tooltip>
            </div>
             <div class="nxPoliceWarningTable WB" id="aa" @mousewheel="tableMouseWheel">
                <tableCom  :option="opt.tableTop" :comSize="opt.tableSize1"
                class="ga-warningPullPanel__alarmTable"
                @handleSelectionChange="selectionChange"></tableCom>
             </div>
        </div>
        <div class="secondTable" v-if = "opt.hasSec">
            <div class="ga-warningPullPanel__tableTitle secTableLeftTitle">{{opt.title2}}</div>
            <div class="nxPoliceWarningTable WB" @mousewheel="tableMouseWheel">
                <tableCom  :option="opt.tableBottom" :comSize="opt.tableSize2" class="ga-warningPullPanel__alarmTable" @handleCurrentPageChange="handleCurrentPageChange" @handleSizePageChange="handleSizePageChange"></tableCom>
            </div>
        </div>
    </div>
</template>
<script>
import tableCom from 'components/Table'
const apiUrl = process.env.NODE_ENV === 'production'
    ? '/policeBusiness' : 'http://10.8.0.11:8080/policeBusiness'
export default {
    name: 'pullPanel',
    props: ['opt', 'warnName'],
    data () {
        return {
            tableTitle: '',
            leftTitle: false,
            containerClassObj: {},
            arrowObj: {},
            listDis: false,
            warmDis: false,
            dialogVisible: false,
            disposeCan: true,
            exportUrl: `${apiUrl}/exportDataTotal/exportData/`,
            // 最新预警的导出
            exportUrls: `${apiUrl}/alarmCityArea/load/`,
            canChange: true
        }
    },
    components: {
        tableCom
    },
    created () {
        if (localStorage.getItem('taskStatus1') === '1') {
            this.canChange = true;
        } else {
            this.canChange = false;
        }
    },
    watch: {
        'opt.warnmoDelId' (val) {
            if (val === 1 || val === 6) {
                this.warmDis = true;
                $('.overDots').eq(0).css('width', '49%')
            }
            if (val === 4) {
                // this.tableTitle = `${this.warnName}详情`
                this.exportUrl += `${this.opt.alarmTaskIds}`
                // 应测试要求，暂时隐藏导出按钮
                this.listDis = false;
                // this.listDis = true;
                $('.overDots').eq(0).css('width', '66%')
            }
            if (val === 11) {
                // this.tableTitle = `${this.warnName}详情`
                this.exportUrls += `${this.opt.alarmTaskIds}`
                this.listDis = true;
                // 昌平的导出人员列表 -- 取消预警导出？？？
                this.warmDis = false;
                $('.overDots').eq(0).css('width', '49%')
            }
        }
    },
    mounted () {
        if (this.opt.leftTitle === true) {
            this.leftTitle = true;
        }
        let { hasSec } = this.opt
        if (hasSec) {
            this.containerClassObj = {
                'ga-warningPullPanel__containerLeft': true,
                'ga-warningPullPanel__containerRight': false
            }
            this.arrowObj = {
                'ga-warningPullPanel__tableArrowLeft': true,
                'ga-warningPullPanel__tableArrowRight': false
            }
        } else {
            this.containerClassObj = {
                'ga-warningPullPanel__containerLeft': false,
                'ga-warningPullPanel__containerRight': true
            }
            this.arrowObj = {
                'ga-warningPullPanel__tableArrowLeft': false,
                'ga-warningPullPanel__tableArrowRight': true
            }
        }
    },
    computed: {
        boxstyle () {
            let { isOpen } = this.opt
            if (isOpen) {
                let { tableSize1, tableSize2 } = this.opt
                let TH1 = tableSize1 ? parseInt(tableSize1.height) + 28 : 0
                let TH2 = tableSize2 ? parseInt(tableSize2.height) + 35 : 0
                let subtitleH = this.hasSubTitle() ? 32 : 0
                return { height: TH1 + TH2 + subtitleH + 'px' }
            } else {
                return {
                    height: 35 + 'px'
                }
            }
        }
    },
    methods: {
        showDialog () {
            this.$emit('showDialog', true);
        },
        tableMouseWheel () {
            $('.el-tooltip__popper.is-dark').css({
                'display': 'none'
            })
        },
        hasSubTitle () {
            return this.opt.subtitle !== undefined && this.opt.subtitle !== ''
        },
        toggleOpen () {
            this.opt.isOpen = !this.opt.isOpen
        },
        handleCurrentPageChange (val) {
            this.$emit('handleCurrentPageChange', val)
        },
        handleSizePageChange (val) {
            this.$emit('handleSizePageChange', val)
        },
        disposeAllData () {
            // 禁止状态下使点击无效
            if (this.disposeCan === true) {
                return
            } else if (this.canChange === false) {
                this.$alert('非在控任务不可处置')
                return
            }
            this.$emit('disposeAllData')
        },
        selectionChange (val) {
            if (val.length !== 0) {
                let arr = [];
                this.disposeCan = false;
                val.forEach(item => {
                    arr.push(item.resourceId)
                })
                this.$emit('disposeData', arr.join(','))
            } else {
                this.disposeCan = true;
                this.$emit('disposeData', '')
            }
        }
        // handleCurrentPageChange (val) {
        //     this.$emit('handleCurrentPageChange', val)
        // }
    }
}
</script>
<style scoped>
.secTableLeftTitle{
    margin-top:8px;
}
.overDots{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 66%;
    display: inline-block;
}
.listOut {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    /*color: #99cc33;*/
    color: #fff;
    /*font-weight: bold;*/
    cursor: pointer;
    /*text-decoration: underline;*/
    margin: 0 15px;
}
.listOut:hover {
    color: #99cc33;
}
.leftTitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    color: #fff;
    cursor: pointer;
}
.leftTitle:hover {
    color: #99cc33;
}
.leftTitle2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    color: #ccc;
    cursor: not-allowed;
}
.firstTable{
    box-shadow:0 4px 5px rgba(0,0,0,0.6);
}
.nxPoliceWarningTable .el-table th:first-child{
    background:transparent;
}
.nxPoliceWarningTable .
.ga-warningPullPanel__alarmTable ga-table{
    padding:0 11px;
}
@component-namespace ga {
     @b warningPullPanel{
        @e container{
            width: 100%;
            height: 26px;
            /*background: rgba(0,0,0,0.7);*/
            overflow: hidden;
            /*box-shadow:4px 4px 5px rgba(0,0,0,0.6);*/
            transition: height 0.5s;
            -moz-transition: height 0.5s;
            -webkit-transition: height 0.5s;
            -o-transition: height 0.5s;
            @m open{
                height: 426px;
            }
        }
        @e containerLeft{
            box-shadow:4px 4px 9px rgba(0,0,0,0.5);
            border-radius: 0 0 5px 5px;
            /*border-radius: 0 0 18px 0;*/
        }
        @e containerRight{
            box-shadow:-4px 4px 9px rgba(0,0,0,0.5);
            border-radius: 0 0 5px 5px;
            /*background: linear-gradient(45deg, transparent 20px, #f00 0);*/
        }
        @e tableTitle{
            color:#fff;
            width: 100%;
            height: 35px;
            line-height: 35px;
            font-size: 14px;
            background: rgba(11, 63, 120, 0.9);
            border-radius: 5px 5px 0 0;
            padding-left: 10px;
        }
        @e subTitle{
            color:#fff;
            font-size:14px;
            height:32px;
            line-height:32px;
            padding:0 6px;
            background: rgba(0,0,0,0.9);
        }
        @e alarmTable{
            /*padding:0px 6px 6px 0;*/
            background:rgba(0,0,0,0.9);
        }
        @e tableArrow{
            /*background: url("~assets/images/warning/dd.png");*/
            /*background-repeat: no-repeat;
            background-position: center center;
            background-size: 100% 100%;
            background-origin: content-box;*/
            height: 25px;
            width: 25px;
            margin-right: 6px;
            margin-top: 5px;
            cursor: pointer;
            font-size: 16px;
            /*transition: transform 0.5s;*/
            @m open{
                /*background-position: center center;
                transform-origin: 50% 50%;*/
                transform:rotate(180deg);
                -moz-transform:rotate(180deg);
                -webkit-transform:rotate(180deg);
                -o-transform:rotate(180deg);
            }
        }
        @e tableArrowLeft{
            float: right;
            line-height: 25px;
            text-align: center;
        }
        @e tableArrowRight{
            float: left;
            line-height: 25px;
            text-align: center;
        }
    }
}
</style>
