<template lang="html">
      <!-- 查看任务弹框 -->
      <div class="ga-createTask">
        <!-- <FormComp :option="formOpt" ref="form"></FormComp>
        <TrasnfreTree :option="transData" ref="tree"></TrasnfreTree> -->
        <sysDialog size="small"
                   title="添加信源挖掘任务"
                   @change="dialogChange"
                   @openCallback="openCallBack"
                   :dialogVisible="show"
                   :okFn="okFn"
                   :cancleFn="cancleFn">
            <FormComp :option="formOpt" ref="form"></FormComp>
            <TrasnfreTree :option="transData" ref="tree"></TrasnfreTree>
        </sysDialog>
      </div>
</template>

<script>
import FormComp from 'components/Form'
import sysDialog from 'components/common/dialog'
import TrasnfreTree from 'components/transfer/transfre-tree'
import { forbiddenDate, getIntervalDate } from 'utils'
import { ajax } from 'common'
// import axios from 'axios'
export default {
    props: ['option'],
    data() {
        // const me = this
        return {
            show: false,
            status: 0,
            // 接口请求参数
            formObj: {
                endTime: '',
                startTime: '',
                taskName: '',
                // 父模块任务id  存当前ls
                parentTaskId: '',
                detailVOList: {}
            },

            // 域名选择器的数据对象
            transData: {
                data: []
            },
            // 表单相关参数
            formOpt: {
                inline: true,
                labelPos: 'right',
                labelWidth: '80',
                btnPos: 'right',
                items: [
                    {
                        label: '任务名称',
                        type: 'text',
                        required: true,
                        wrap: true,
                        comOpt: {
                            id: 'taskName',
                            value: '',
                            width: 510,
                            disabled: false
                        }
                    },
                    {
                        label: '开始日期',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'startTime',
                            value: '',
                            type: 'date',
                            isStart: true,
                            disabled: false,
                            width: '210',
                            format: 'yyyy-MM-dd',
                            pickOptions: {
                                disabledDate(time) {
                                    return forbiddenDate(time)
                                }
                            }
                        }
                    },
                    {
                        label: '截止日期',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'endTime',
                            value: '',
                            disabled: false,
                            type: 'date',
                            width: '210',
                            format: 'yyyy-MM-dd',
                            pickOptions: {
                                disabledDate(time) {
                                    return forbiddenDate(time)
                                }
                            }
                        }
                    }
                ]
            }
        }
    },
    mounted() {
    },
    computed: {
        // 模块任务ID
        taskMainId() {
            return localStorage.getItem('taskId') || ''
        }
    },
    methods: {
        // 加载信源树接口
        async loadSourceTree() {
            let { rows } = await ajax.get('/informationSource/selectInforSource')
            if (rows && rows.length) {
                let wantData = rows.map(it => {
                    let id = it.typeId
                    let sub = it.sub.map(item => {
                        return {
                            id: '##' + item.inforsourceId,
                            domain: item.inforsourceDomain,
                            name: `${item.inforsourceName}(${item.inforsourceDomain})`,
                            label: `${it.name}${item.inforsourceName}(${item.inforsourceDomain})`,
                            dataObj: item
                        }
                    })
                    return {
                        id,
                        label: it.name,
                        name: it.name,
                        sub
                    }
                })
                this.transData.data = _.cloneDeep(wantData)
            }
        },

        // 查看任务列表
        createTask() {
            window.GALoading.open('创建任务中,请耐心等会儿...')
            ajax
                .post(`/informationSource/addInforSourceTask`, {
                    jsonStr: JSON.stringify(this.formObj)
                })
                .then(resp => {
                    if (resp) {
                        this.$message.success('创建任务成功！')
                        this.$refs.form.clearValue()
                        this.$refs.tree.clearValue()
                        window.GALoading.close()
                        this.show = false
                    }
                })
                .catch(error => {
                    this.status = error.status
                    console.log('errorerrorerror', error)
                    if (this.status === 300) {
                        this.show = true
                    }
                    window.GALoading.close()
                })
        },
        openCallBack() {
            this.loadSourceTree()
            // 初始化时间组件
            // let yesterDay = new Date().getTime() - 24 * 60 * 60 * 1000
            this.$refs.form.setValue([
                { id: 'startTime', value: getIntervalDate(1) },
                { id: 'endTime', value: getIntervalDate() }
            ])
            // axios.get('../../../static/mock/tree.json').then(resp => {
            //     let { rows } = resp.data
            //     if (rows && rows.length) {
            //         let wantData = rows.map(it => {
            //             let id = '#' + it.typeId
            //             let sub = it.sub.map(item => {
            //                 return {
            //                     id: item.inforsourceId,
            //                     domain: item.inforsourceDomain,
            //                     name: `${item.inforsourceName}(${item.inforsourceDomain})`,
            //                     label: `${it.name}${item.inforsourceName}(${item.inforsourceDomain})`,
            //                     dataObj: item
            //                 }
            //             })
            //             return {
            //                 id,
            //                 label: it.name,
            //                 name: it.name,
            //                 sub
            //             }
            //         })
            //         console.log('2222222222222', wantData)
            //         this.transData.data = _.cloneDeep(wantData)
            //     }
            // })
        },
        dialogChange(val) {
            this.show = val
        },
        okFn() {
            let getVals = this.$refs.form.getValue()
            let { startTime, endTime, taskName } = getVals
            // if (taskName === '') {
            //     this.$message('任务名称不能为空！')
            //     return
            // }
            if (startTime === '' || endTime === '') {
                this.$alert('开始时间不能为空！', {
                    confirmButtonText: '确定'
                })
                return
            }
            if (startTime > endTime) {
                this.$alert('开始时间不能大于结束时间！', {
                    confirmButtonText: '确定'
                })
                return
            }

            let recx = /^[0-9A-Za-z\u4e00-\u9fa5]{1,20}$/
            if (!recx.test(taskName)) {
                this.$alert('请输入由1~20位汉字、字母、数字组成的的任务名称', {
                    confirmButtonText: '确定'
                })
                return
            }
            // if (taskName.length > 20) {
            //     this.$message('任务名称最大长度不能超过20位！')
            //     return
            // }
            //
            console.log(getVals)
            this.formObj.endTime = getVals.endTime
            this.formObj.startTime = getVals.startTime
            this.formObj.taskName = getVals.taskName

            let slist = this.$refs.tree.getValue()
            // console.log(slist)
            if (slist && slist.length === 0) {
                this.$alert('请选择信源', {
                    confirmButtonText: '确定'
                })
                return
            }
            if (slist && slist.length > 20) {
                this.$alert('信源不能超过20个！', {
                    confirmButtonText: '确定'
                })
                return
            }

            this.formObj.detailVOList = slist.map(item => {
                return item.dataObj
            })

            this.formObj.inforsourceNum = this.formObj.detailVOList.length
            this.formObj.parentTaskId = this.taskMainId
            this.createTask()
        },
        cancleFn() {
            // 清空表单和树形数据
            this.$refs.form.clearValue()
            this.$refs.tree.clearValue()
            this.show = false
        }
    },
    watch: {
        option() {
            this.show = true
        }
    },
    components: {
        FormComp,
        sysDialog,
        TrasnfreTree
    }
}
</script>

<style >
</style>
