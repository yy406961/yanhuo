<template>
	<div class="ga-personnalPortrayal">
		<personPortrayalForm :option="formOpt" ref="form"></personPortrayalForm>
		<personPortrayalTable :option="tableOpt" :comSize="tableSize"
		                      @handleCurrentPageChange="handleCurrentPageChange"
		                      @handleSizePageChange="handleSizePageChange"></personPortrayalTable>
	</div>
</template>
<script>
    import personPortrayalForm from 'components/Form'
    import personPortrayalTable from 'components/Table'
    import { personnalPortrayal, targetNumAll } from 'api/msgAnalysis/personnalPortrayal'
    import { mapGetters } from 'vuex'
    import { forbiddenDate, formatTime } from 'utils'
    export default {
        name: 'personnalPortrayal',
        data () {
            const me = this;
            const nowTime = new Date();
            return {
                formHeight: '',
                contentShow: false,
                formObj: {
                    goalMsisdn: '',
                    queryBeginTime: '',
                    queryEndTime: '',
                    userId: '',
                    rows: 10,
                    page: 1
                },
                formOpt: {
                    inline: true,
                    btnPos: 'right',
                    labelWidth: '100',
                    items: [{
                        label: '目标号码',
                        type: 'autoCompletet',
                        required: true,
                        comOpt: {
                            id: 'goalMsisdn',
                            value: '',
                            disabled: false,
                            data: []
                        }
                    }, {
                        label: '开始时间',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'queryBeginTime',
                            value: me.formatTime(nowTime),
                            disabled: false,
                            type: 'datetime',
                            pickOptions: {
                                disabledDate (time) {
                                    return forbiddenDate(time)
                                }
                            }
                        }
                    }, {
                        label: '结束时间',
                        type: 'date',
                        required: true,
                        comOpt: {
                            id: 'queryEndTime',
                            value: this.formatTime(nowTime),
                            disabled: false,
                            type: 'datetime',
                            pickOptions: {
                                disabledDate (time) {
                                    return forbiddenDate(time)
                                }
                            }
                        }
                    }],
                    btns: [
                        {
                            label: '',
                            type: 'button',
                            comOpt: {
                                value: '查询',
                                disabled: false,
                                click () {
                                    me.contentShow = true;
                                    me.getList();
                                }
                            }
                        }
                    ]
                },
                tableOpt: {
                    listLoading: false,
                    stripe: false,
                    column: [
                        { name: '序号', value: 'index', width: 80, align: 'center', fixed: 'left' },
                        { name: '对方号码', value: 'receiveMsisdn', width: 150, align: 'center', fixed: 'left' },
                        { name: '时间', value: 'sendTime', width: 200, align: 'center', fixed: 'left' },
                        { name: '短信内容', value: 'content', align: 'center' },
                        { name: '类型', value: 'relateType', align: 'center', width: 80 }
                    ],
                    data: [],
                    pagination: true,
                    pageOpt: {
                        currentPage: 1,
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                }
            }
        },
        methods: {
// 人物画像短信查询
            async getMsgContent (val) {
                this.tableOpt.listLoading = true;
                let resp = await personnalPortrayal(this.formObj);
                let { rows } = resp
                if (rows && _.isArray(rows)) {
                    rows.map((item) => {
                        if (item.relateType === 1) {
                            item.relateType = '主短';
                        } else {
                            item.relateType = '被短'
                        }
                        return item
                    })
                    this.tableOpt.listLoading = false;
                    this.tableOpt.data = rows;
                    this.tableOpt.pageOpt.total = resp.total;
                    this.tableOpt.pageOpt.currentPage = val || 1
                }
            },
// 目标号码自动补全接口
            async targetNumAll () {
                let resp = await targetNumAll();
                if (resp) {
                    this.$refs.form.setItemData('goalMsisdn', resp.rows);
                }
            },
            handleCurrentPageChange (val) {
                this.formObj.page = val;
                if (this.contentShow) {
                    this.getList(val);
                }
            },
            handleSizePageChange (val) {
                this.formObj.rows = val;
                this.formObj.page = 1;
                if (this.contentShow) {
                    this.getList();
                }
            },
            formatTime,
            getList (val) {
                this.formObj = Object.assign(this.formObj, this.$refs.form.getValue());
                this.formObj.userId = this.userName;
                if (this.formObj.queryBeginTime > this.formObj.queryEndTime) {
                    this.$alert('请输入正确的起止时间', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.getMsgContent(val);
                }
            }
        },
        components: {
            personPortrayalForm,
            personPortrayalTable
        },
        mounted () {
            this.formHeight = this.$refs.form.getContainerHeight();
            this.targetNumAll();
        },
        computed: {
            ...mapGetters({
                'userName': 'global/userName',
                'vsHeight': 'global/visualHeight'
            }),
            tableSize () {
                return {
                    height: this.vsHeight - this.formHeight - 20
                }
            }
        }
    }
</script>
<style scoped>

</style>
