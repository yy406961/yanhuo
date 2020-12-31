<template>
    <div class="ga-all">
        <p class="ga-all__title" v-if="renderData">{{names}}({{msisdn}})上网详情</p>
        <p class="ga-all__title" v-else>上网详情</p>
        <formComp :option="formOpt"></formComp>
        <tableComp :option="tableOpt" :comSize="tableHeight"
        @handleCurrentPageChange="tableCurrent"
        @handleSizePageChange = "tableSize"></tableComp>
    </div>
</template>

<script>
    import formComp from 'components/Form/index'
    import tableComp from 'components/Table'
    import { internetDetail } from 'api/relationAnalysis/newFigurePortrait/stability'
    import { mapGetters } from 'vuex'
    export default {
        props: ['renderData'],
        data () {
            let this_ = this;
            return {
                names: '',
                msisdn: '',
                formOpt: {
                    inline: true,
                    items: [
                        {
                            label: '',
                            type: 'checkbox',
                            comOpt: {
                                id: 'check',
                                value: [],
                                data: [
                                    { name: '敏感网站', value: 1 },
                                    { name: '网站', value: 2 }
                                ],
                                change: function (e) {
                                    console.log(e)
                                }
                            }
                        },
                        {
                            label: '动作',
                            type: 'select',
                            comOpt: {
                                id: 'active',
                                value: '',
                                data: []
                            }
                        },
                        {
                            label: '起始时间',
                            type: 'date',
                            // required: true,
                            comOpt: {
                                width: 200,
                                id: 'startTime',
                                value: new Date() - 60000,
                                disabled: false,
                                type: 'datetime',
                                pickOptions: {
                                    disabledDate (time) {
                                        let cDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                                        let cTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
                                        let pDate = moment(new Date()).subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss');
                                        return !moment(cTime).isBetween(pDate, cDate);
                                    }
                                }
                                // change: function (e) {
                                //     me.formValue = e
                                // }
                            }
                        },
                        {
                            label: '截止时间',
                            type: 'date',
                            // required: true,
                            comOpt: {
                                width: 200,
                                id: 'endTime',
                                value: new Date(),
                                type: 'datetime',
                                pickOptions: {
                                    disabledDate (time) {
                                        let cDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                                        let cTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
                                        let pDate = moment(new Date()).subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss');
                                        return !moment(cTime).isBetween(pDate, cDate);
                                    }
                                }
                            }
                        }
                    ],
                    btns: [
                        {
                            type: 'button',
                            comOpt: {
                                id: 'search',
                                value: '查询',
                                click: function () {
                                    if (!this_.renderData.msisdn) {
                                        return
                                    }
                                    this_.internetDetailFun(1, 10)
                                }
                            }
                        }
                    ]
                },
                tableOpt: {
                    listLoading: false,
                    column: [
                        { name: '序号', value: 'index', width: 80 },
                        { name: '网址', value: 'url', width: 200 },
                        { name: '时间', value: 'time', width: 150 },
                        { name: '账号', value: 'userName', width: 150 },
                        { name: '动作', value: 'active', width: 300 },
                        { name: '内容', value: 'content', width: 400 }
                    ],
                    data: [
                        { url: 1, time: 1, userName: 1, active: 1, content: 1 }
                    ],
                    pagination: true,
                    pageOpt: {
                        total: 0,
                        pageSizes: [10, 20, 30, 40, 50],
                        pageSize: 10
                    }
                }
            }
        },
        watch: {
            'renderData' () {
                if (this.renderData.name && this.renderData.msisdn) {
                    this.names = this.renderData.name;
                    this.msisdn = this.renderData.msisdn;
                }
            }
        },
        computed: {
            ...mapGetters({
                'vsHeight': 'global/visualHeight'
            }),
            tableHeight () {
                return {
                    height: this.vsHeight - 175
                }
            }
        },
        methods: {
            // 分页
            tableCurrent (val) {
                this.internetDetailFun(val, this.tableOpt.pageOpt.pageSize)
            },
            tableSize (val) {
                this.tableOpt.pageOpt.pageSize = val;
                this.internetDetailFun(1, val)
            },
            // 请求表格数据
            async internetDetailFun (page, rows) {
                this.tableOpt.listLoading = true;
                this.tableOpt.data = [];
                let resp = await internetDetail();
                this.tableOpt.pageOpt.currentPage = page;
                this.tableOpt.pageOpt.pageSize = rows;
                if (resp) {
                    this.tableOpt.data = resp.data;
                    this.tableOpt.pageOpt.total = resp.total;
                    this.tableOpt.listLoading = false;
                } else {
                    this.tableOpt.listLoading = false;
                }
            }
        },
        components: {
            formComp,
            tableComp
        }
    }
</script>

<style scoped>
    @component-namespace ga {
        @b all {
            width: 100%;
            height: 100%;
            @e title {
                width: 100%;
                height: 30px;
                margin: 0 0 5px 0;
                font-size: 17px;
                line-height: 30px;
                color: #9af5f6;
            }
            & .yq-form {
                margin: 0;
            }
        }
    }
</style>
