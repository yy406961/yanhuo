<template>
    <div class="ga-taskAgreeFun">
        <div  class="ga-taskAgreeFun__FunContent" :style="bottomSquareMax">
            <ul class="ga-configBasic__funUl">
                <li v-for="item in selectedFun" :key="item.menuId">{{item.menuName}}</li>
            </ul>
            <ul class="ga-configBasic__warnUl">
                <li v-for="item in selectedWarn" :key="item.menuId">{{item.menuName}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import square from 'components/common/square'
    import tableComp from 'components/Table/'
    import { taskBaseInfoQuery } from 'api/task/taskDetail'
    // import { taskBaseQuery } from 'api/task/taskConfig'
    import { mapGetters } from 'vuex'
    export default {
        name: 'selectFun',
        data () {
            return {
                approverStatus: '',
                taskId: '',
                taskName: '',
                // beginTime: '',
                // endTime: '',
                // funCount: '',
                // taskTargetCount: '',
                // taskAreaCount: '',
                // taskUser: '',
                selectedFun: [],
                selectedWarn: [],
                sendTaskId: ''
                // taskParm: {
                //     taskName: '',
                //     beginTime: '',
                //     endTime: '',
                //     funCount: '',
                //     taskTargetCount: '',
                //     taskUser: ''
                // }
            }
        },
        props: {
            taskIdProp: {
                type: String
            },
            approverStatusProp: {
                type: Number
            }
        },
        methods: {
            // 基础数据功能告警树的信息
            async taskBaseInfoQuery () {
                let resp = await taskBaseInfoQuery({ taskBaseId: this.sendTaskId, approverStatus: this.approverStatus })
                if (resp) {
                    let { rows } = resp
                    rows.map(item => {
                        if (item.approverStatus === 1 || item.approverStatus === 3) {
                            if (item.dictType === 'funType' || item.dictType === 'importantArea') {
                                if (item.funStatus === '1') {
                                    this.selectedFun.push(item)
                                }
                            } else if (item.dictType === 'alarmType') {
                                if (item.alarmStatus === '1') {
                                    this.selectedWarn.push(item)
                                }
                            }
                        }
                    })
                }
            }
            // 基础信息查询
            // async getTaskBaseQuery () {
            //     let resp = await taskBaseQuery({ taskBaseId: this.sendTaskId, approverStatus: this.approverStatus })
            //     if (resp) {
            //         this.taskParm = resp.data
            //         this.taskParm.taskUser = resp.data.userNick;
            //     }
            // }
        },
        components: {
            square,
            tableComp
        },
        computed: {
            comSize () {
                return { 'height': 100 }
            },
            topSquare () {
                return this.vsHeight - 300
            },
            bottomSquare () {
                return 250
            },
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            bottomSquareMax () {
                return {
                    'height': Math.floor((this.vsHeight - 180) / 4) + 'px',
                    'overflowY': 'auto'
                }
            }
        },
        mounted () {
            this.approverStatus = this.approverStatusProp;
            this.taskId = this.taskIdProp
            // 刷新页面
            // if (this.taskId) {
            //     localStorage.setItem('SFtaskId', this.taskId)
            //     localStorage.setItem('SFtaskName', this.taskName)
            //     localStorage.setItem('SFtaskST', this.taskST)
            //     localStorage.setItem('SFtaskET', this.taskET)
            // }
            // if (localStorage.getItem('SFtaskId')) {
            //     this.taskId = localStorage.getItem('SFtaskId')
            //     this.taskName = localStorage.getItem('SFtaskName')
            //     this.taskST = localStorage.getItem('SFtaskST')
            //     this.taskET = localStorage.getItem('SFtaskET')
            // }
            if (this.taskId.charAt(0) === 'T') {
                this.sendTaskId = this.taskId.substr(1)
            } else {
                this.sendTaskId = this.taskId
            }
            // 基础信息功能告警查询
            // taskBaseInfoQuery({ taskBaseId: this.sendTaskId }).then(resp => {
            //     let { rows } = resp
            //     rows.map(item => {
            //         if (item.dictType === 'funType') {
            //             if (item.funStatus === '1') {
            //                 this.selectedFun.push(item)
            //             }
            //         } else if (item.dictType === 'alarmType') {
            //             if (item.alarmStatus === '1') {
            //                 this.selectedWarn.push(item)
            //             }
            //         }
            //     })
            // })
            this.taskBaseInfoQuery()
            // this.getTaskBaseQuery()
        }
    }
</script>
<style scoped>
    @component-namespace ga {
        @b taskAgreeFun {
            font-size:12px;
            padding: 6px;
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.1);
            @e FunContent{
                li{
                    display: inline-block;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    margin-right: 12px;
                    width: calc((100% - 60px)/6);
                    background: rgba(189,240,255,0.10);
                    box-shadow: inset 0 -1px 0 0 rgba(110,222,255,0.40), inset 0 1px 0 0 rgba(110,222,255,0.40);
                    &:nth-child(6n){
                        margin-right:0;
                    }
                }
            }
            @e funUl{
                li{
                    &:nth-child(n+7){
                        margin-top:12px;
                    }
                }
            }
            @e warnUl{
                li{
                    margin-top:12px;
                }
            }
        }
        @b taskFun {
            margin-top: 20px;
            @e selected {
                height: 30px;
            }
        }
        @b list {
            width: 15%;
            float: left;
        }
    }
</style>
